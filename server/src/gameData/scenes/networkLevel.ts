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
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';
import { ClientPackets } from '../../networkPackets/fromClient/clientPackets';
import { PacketPing } from '../../networkPackets/fromServer/ping';
import { PacketClientSync } from '../../networkPackets/fromClient/clientSync';
import { PacketPlayerLeft } from '../../networkPackets/fromServer/playerLeft';
import { take } from 'rxjs/operators';
import { ArmorType } from '../gameplay/items/itemEnums';
import { Armor } from '../gameplay/items/armor';
import { PacketEntityDamaged } from '../../networkPackets/fromServer/entityDamaged';
import { PlayerDataSnapshot } from '../../models/userDataSnapshot';
import { PlayerNetworkingService } from '../../services/playerNetworkingService';
import { PlayerDataService } from '../../services/playerDataService';

export class NetworkLevel extends Scene implements LevelScene {
  public mapGrid: MapGrid;
  public levelLoader: LevelLoaderService;

  public levelName: string;
  public entities: Entity[] = [];
  public clients: GameClient[] = [];

  protected entitySpawner: NetworkEntitySpawner;
  protected playerNetworking: PlayerNetworkingService;

  private roomReady$ = new BehaviorSubject<boolean>(false);

  private syncCounter = 0;
  private readonly syncThreshold = 5;

  constructor(private server: io.Server, private playerDataService: PlayerDataService, private roomName: string) {
    super({ key: 'networklevel' });

    this.levelName = roomName;
  }

  public get roomReady() {
    return this.roomReady$.asObservable();
  }

  create() {
    this.mapGrid = new MapGrid(this, 'tileset');

    this.levelLoader = new LevelLoaderService(this);

    this.levelLoader.importlevel(LocationList.get(this.roomName).levelData);

    this.entitySpawner = new NetworkEntitySpawner(this);
    this.playerNetworking = new PlayerNetworkingService(this, this.playerDataService);

    fromEvent(this.events, 'preupdate').subscribe(this.preupdate.bind(this));
    fromEvent(this.events, 'postupdate').subscribe(this.postupdate.bind(this));

    this.roomReady$.next(true);

    setTimeout(() => {
      const stalker = this.entitySpawner.spawnStalker(new Phaser.Math.Vector2(-2, 12), 10);
      stalker.equipArmor(new Armor({
        armor: 100,
        armorType: ArmorType.Chestplate,
        name: 'Steel vest',
        texture: 'steel_vest'
      }));

      this.broadcastPacket(...NetworkPacketSerializer.spawnEntity(stalker));
    }, 3000);
  }

  preload() {
    AssetService.loadBlockSprites(this.load);

    AssetService.loadEntitySprites(this.load);
  }

  preupdate() {
    this.clients
      .filter(c => !!c.controlledEntity?.gameObject?.body && !!c.syncSnapshot)
      .forEach(c => {
        const clientPos = new Phaser.Math.Vector2(c.syncSnapshot.positionX, c.syncSnapshot.positionY);
        const clientVelocity = new Phaser.Math.Vector2(c.syncSnapshot.velocityX, c.syncSnapshot.velocityY);
        // console.log(`SYNC PACKET: X: ${c.syncSnapshot.positionX}; Y: ${c.syncSnapshot.positionY}`);
        c.syncSnapshot = null;

        const ping = c.ping + (performance.now() - c.syncSnapshotTimestamp);

        const predictedPos = clientPos.add(clientVelocity.scale(ping * 0.001));

        c.controlledEntity.gameObject.setPosition(predictedPos.x, predictedPos.y);
        try {
          c.controlledEntity.gameObject.body.setVelocityX(clientVelocity.x);
          c.controlledEntity.gameObject.body.setVelocityY(clientVelocity.y);
        } catch (err) {
          console.log(this.clients.map(cli => { return { name: cli.nickname, body: cli.controlledEntity.gameObject.body }}));
          throw err;
        }

        // console.log(`SYNCED: X: ${c.controlledEntity.gameObject.x}`)
      });
  }

  update() {
    this.entities.forEach(e => {
      e.update();
    });
  }

  postupdate() {
    if (this.syncCounter >= this.syncThreshold) {
      const syncPacket = NetworkPacketSerializer.syncSnapshot(this);
      this.server.to(this.roomName).emit(ServerPackets.SYNC_SNAPSHOT, syncPacket);
      this.syncCounter = 0;
    } else {
      this.syncCounter++;
    }
  }

  addPlayer(player: GameClient, playerData: PlayerDataSnapshot) {
    const existingPlayers = [...this.clients];

    player.socket.emit(ServerPackets.INIT_LEVEL, NetworkPacketSerializer.initLevel(this));
    console.log(`>> ${ServerPackets.INIT_LEVEL}`);

    this.entities.forEach(e => {
      player.socket.emit(...NetworkPacketSerializer.spawnEntity(e));
      console.log(`>> ${ServerPackets.SPAWN_ENTITY} (spawn all present entities for new player)`);
    });

    const spawnedEntity = this.entitySpawner.spawnPlayer(player, playerData, new Phaser.Math.Vector2(0, 0));
    console.log(`spawned entity pos: ${spawnedEntity.gameObject.body.x}; ${spawnedEntity.gameObject.body.y}`);
    player.controlledEntity = spawnedEntity;

    console.log('Existing players:');
    console.log(existingPlayers);
    existingPlayers.forEach(p => {
      p.socket.emit(...NetworkPacketSerializer.spawnEntity(spawnedEntity));
      console.log(`>> ${ServerPackets.SPAWN_ENTITY} (spawn new player for existing players)`);
    });

    player.socket.emit(...NetworkPacketSerializer.spawnPlayer(spawnedEntity));
    console.log(`>> ${ServerPackets.SPAWN_PLAYER} (tell player to spawn himself)`);

    this.clients.push(player);
    this.playerNetworking.addPlayerInputListeners(player);
    // player.socketSubscriptions.push(fromEvent<number>(player.socket, ClientPackets.PING)
    //   .subscribe(clientTimestamp => {
    //     player.socket.emit(ServerPackets.PONG, {
    //       clientTimestamp,
    //       serverTimeStamp: performance.now()
    //     } as PacketPing);
    //   }));

    // player.socketSubscriptions.push(fromEvent<number>(player.socket, ClientPackets.PING2)
    //   .subscribe(serverTimestamp => {
    //     player.ping = (performance.now() - serverTimestamp) * 0.5;
    //     // console.log(`PING: ${player.ping}`);
    //   }));

    // player.socketSubscriptions.push(fromEvent<PacketClientSync>(player.socket, ClientPackets.CLIENT_SYNC)
    //   .subscribe(packet => {
    //     player.syncSnapshot = packet;
    //     player.syncSnapshotTimestamp = performance.now();
    //   }));

    // player.socketSubscriptions.push(fromEvent<string>(player.socket, 'disconnect')
    //   .pipe(take(1))
    //   .subscribe(reason => {
    //     console.log(`PLAYER DISCONNECTED <network level>: ${reason}`);

    //     const index = this.clients.indexOf(player);
    //     const networkId = player.controlledEntity?.networkId;

    //     if (index < 0) {
    //       console.error('Player not found.');
    //       return;
    //     }

    //     this.clients.splice(index, 1);
    //     player.controlledEntity?.destroy();
    //     player.socketSubscriptions.forEach(s => s.unsubscribe());

    //     if (!!networkId) {
    //       this.broadcastPacket(ServerPackets.PLAYER_LEFT, {
    //         networkId: player.controlledEntity.networkId
    //       } as PacketPlayerLeft);
    //     }
    //   }));
  }

  broadcastPacket(packetType: ServerPackets, packet: any) {
    this.server.to(this.roomName).emit(packetType, packet);
  }
}
