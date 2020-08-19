import * as io from 'socket.io';
import { performance } from 'perf_hooks';
import { Scene } from 'phaser';
import { Entity } from '../gameplay/entities/baseEntity';
import { AssetService } from '../gameServices/asset.service';
import { NetworkEntitySpawner } from '../../services/networkEntitySpawner';
import { GameClient } from '../../models/gameClient';
import { LevelScene } from '../../core/levelScene';
import { MapGrid } from '../../core/mapGrid';
import { ServerPackets } from '../../networkPackets/fromServer/serverPackets';
import { LevelLoaderService } from '../../gameData/gameServices/level-loader.service';
import { NetworkPacketSerializer } from '../../services/networkPacketSerializer';
import { LocationList } from '../../serverCore/locationList';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { ClientPackets } from '../../networkPackets/fromClient/clientPackets';
import { take } from 'rxjs/operators';

export class NetworkLevel extends Scene implements LevelScene {
  public mapGrid: MapGrid;
  public levelLoader: LevelLoaderService;

  public levelName: string;
  public entities: Entity[] = [];
  public clients: GameClient[] = [];

  protected entitySpawner: NetworkEntitySpawner;

  private roomReady$ = new BehaviorSubject<boolean>(false);

  private syncTick = 0;
  private readonly syncThreshold = 5;

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

    fromEvent(this.events, 'postupdate').subscribe(this.postupdate.bind(this));

    this.roomReady$.next(true);
  }

  preload() {
    AssetService.loadBlockSprites(this.load);

    AssetService.loadEntitySprites(this.load);
  }

  update() {
    this.entities.forEach(e => {
      e.update();
    });
  }

  postupdate() {
    if (this.syncTick >= this.syncThreshold) {
      const syncPacket = NetworkPacketSerializer.syncSnapshot(this);
      const beforePing = performance.now();
      this.clients.forEach(gc => {
        fromEvent<void>(gc.socket, ClientPackets.PING)
          .pipe(take(1))
          .subscribe(() => {
          gc.ping = (performance.now() - beforePing) * 0.5;
          console.log(`PING: ${gc.ping}`);
          gc.socket.emit(ServerPackets.PONG);
        })
      });
      this.server.to(this.roomName).emit(ServerPackets.SYNC_SNAPSHOT, syncPacket);
      this.syncTick = 0;
    } else {
      this.syncTick++;
    }
  }

  addPlayer(player: GameClient) {
    const existingPlayers = [...this.clients];

    player.socket.emit(ServerPackets.INIT_LEVEL, NetworkPacketSerializer.initLevel(this));
    console.log(`>> ${ServerPackets.INIT_LEVEL}`);

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

    this.clients.push(player);
  }

  broadcastPacket(packetType: ServerPackets, packet: any) {
    this.server.to(this.roomName).emit(packetType, packet);
  }
}
