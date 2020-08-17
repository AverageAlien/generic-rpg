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
import { BehaviorSubject, interval } from 'rxjs';

export class NetworkLevel extends Scene implements LevelScene {
  public mapGrid: MapGrid;
  public levelLoader: LevelLoaderService;

  public levelName: string;
  public entities: Entity[] = [];
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

    this.levelLoader = new LevelLoaderService(this);

    this.levelLoader.importlevel(LocationList.get(this.roomName).levelData);

    this.entitySpawner = new NetworkEntitySpawner(this);

    this.roomReady$.next(true);

    interval(250)
      .subscribe(() => {
        this.server.to(this.roomName).emit(ServerPackets.SYNC_SNAPSHOT, NetworkPacketSerializer.syncSnapshot(this));
      });
  }

  preload() {
    AssetService.loadBlockSprites(this.load);

    AssetService.loadEntitySprites(this.load);
  }

  update() {
    this.entities.forEach(e => {
      e.update();
      // console.log(`entity ${e.entityName} position: ${e.gameObject.body.position.x}; ${e.gameObject.body.position.y}`);
    });
  }

  addPlayer(player: GameClient) {
    const existingPlayers = [...this.clients];

    player.socket.emit(ServerPackets.INIT_LEVEL, NetworkPacketSerializer.initLevel(this));
    console.log(`>> ${ServerPackets.INIT_LEVEL}`);

    this.clients.push(player);

    this.entities.forEach(e => {
      player.socket.emit(...NetworkPacketSerializer.spawnEntity(e));
      console.log(`>> ${ServerPackets.SPAWN_ENTITY} (spawn all present entities for new player)`);
    });

    const spawnedEntity = this.entitySpawner.spawnPlayer(player, new Phaser.Math.Vector2(0, 0));
    console.log(`spawned entity pos: ${spawnedEntity.gameObject.body.x}; ${spawnedEntity.gameObject.body.y}`);

    console.log('Existing players:');
    console.log(existingPlayers);
    existingPlayers.forEach(p => {
      p.socket.emit(...NetworkPacketSerializer.spawnEntity(spawnedEntity));
      console.log(`>> ${ServerPackets.SPAWN_ENTITY} (spawn new player for existing players)`);
    });

    player.socket.emit(...NetworkPacketSerializer.spawnPlayer(spawnedEntity));
    console.log(`>> ${ServerPackets.SPAWN_PLAYER} (tell player to spawn himself)`);
  }

  broadcastPacket(packetType: ServerPackets, packet: any) {
    this.server.to(this.roomName).emit(packetType, packet);
  }
}
