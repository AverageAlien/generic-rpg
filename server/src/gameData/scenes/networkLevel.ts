import * as io from 'socket.io';
import { Scene } from 'phaser';
import { Entity } from '../gameplay/entities/baseEntity';
import { AssetService } from '../gameServices/asset.service';
import { NetworkEntitySpawner } from '../../services/networkEntitySpawner';
import { GameClient } from '../../models/gameClient';
import { LevelScene } from '../../core/levelScene';
import { MapGrid } from '../../core/mapGrid';
import { ServerPackets } from '../../networkPackets/fromServer/serverPackets';
import { PacketInitLevel } from '../../networkPackets/fromServer/initLevel';
import { LevelLoaderService } from '../../gameData/gameServices/level-loader.service';
import { NetworkPacketSerializer } from '../../services/networkPacketSerializer';
import { LocationList } from '../../serverCore/locationList';
import { BehaviorSubject } from 'rxjs';

export class NetworkLevel extends Scene implements LevelScene {
  public mapGrid: MapGrid;
  public levelName: string;
  public entities: Entity[];
  public clients: GameClient[] = [];

  protected entitySpawner: NetworkEntitySpawner;

  private roomReady$ = new BehaviorSubject<boolean>(false);

  constructor(private server: io.Server, private roomName: string) {
    super({ key: 'networklevel' });
  }

  public get roomReady() {
    return this.roomReady$.asObservable();
  }

  create() {
    this.mapGrid = new MapGrid(this, 'tileset');

    console.log(`loading ${this.roomName}`);
    LevelLoaderService.importlevel(LocationList.get(this.roomName).levelData, this);
    console.log(`loaded ${this.roomName}`);

    this.entitySpawner = new NetworkEntitySpawner(this);

    this.roomReady$.next(true);
  }

  preload() {
    AssetService.loadBlockSprites(this.load);

    AssetService.loadEntitySprites(this.load);
  }

  update() {
    this.entities.forEach(e => e.update());
  }

  addPlayer(player: GameClient) {
    const existingPlayers = [...this.clients];

    player.socket.emit(ServerPackets.INIT_LEVEL, {
      locationName: this.levelName,
      levelData: LevelLoaderService.exportLevel(this)
    } as PacketInitLevel);

    this.clients.push(player);

    this.entities.forEach(e => {
      player.socket.emit(...NetworkPacketSerializer.spawnEntity(e));
    });

    const spawnedEntity = this.entitySpawner.spawnPlayer(player, new Phaser.Math.Vector2(0, 0));

    console.log('Existing players:');
    console.log(existingPlayers);
    existingPlayers.forEach(p => {
      p.socket.emit(...NetworkPacketSerializer.spawnEntity(spawnedEntity));
    });

    player.socket.emit(...NetworkPacketSerializer.spawnPlayer(spawnedEntity));
  }

  broadcastPacket(packetType: ServerPackets, packet: any) {
    this.server.to(this.roomName).emit(packetType, packet);
  }
}
