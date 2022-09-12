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
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { PlayerDataSnapshot } from '../../models/userDataSnapshot';
import { PlayerNetworkingService } from '../../services/playerNetworkingService';
import { PlayerDataService } from '../../services/playerDataService';
import { LocationDataService } from '../../services/locationDataService';
import { filter } from 'rxjs/operators';
import { ServerWrapperController } from '../gameplay/controllers/serverWrapperController';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { WeaponService } from '../../services/weaponService';
import { ArmorPresets } from '../itemPresets/armorPresets';
import { WeaponPresets } from '../itemPresets/weaponPresets';

export class NetworkLevel extends Scene implements LevelScene {
  public mapGrid: MapGrid;
  public levelLoader: LevelLoaderService;
  public weaponService: WeaponService;

  public levelName: string;
  public entities: Entity[] = [];
  public clients: GameClient[] = [];
  private networkBots: ServerWrapperController[] = [];

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

    this.levelLoader = new LevelLoaderService(this, new LocationDataService());

    this.entitySpawner = new NetworkEntitySpawner(this);
    this.playerNetworking = new PlayerNetworkingService(this, this.playerDataService);
    this.weaponService = new WeaponService(this);

    fromEvent(this.events, 'preupdate').subscribe(this.preupdate.bind(this));
    fromEvent(this.events, 'postupdate').subscribe(this.postupdate.bind(this));

    this.loadLevel().pipe(
      filter(b => b)
    ).subscribe(_ => {
      this.roomReady$.next(true)
    });

    setTimeout(() => {
      const entities = this.spawnEntities();

      entities.forEach(e => {
        this.broadcastPacket(...NetworkPacketSerializer.spawnEntity(e))
      });
    }, 3000);
  }

  protected loadLevel(): Observable<boolean> {
    return this.levelLoader.importLevelByName(this.roomName);
  }

  protected spawnEntities(): HumanoidEntity[] {
    const stalker = this.entitySpawner.spawnStalker(new Phaser.Math.Vector2(-2, 12), 10);
    stalker.equipArmor(ArmorPresets.chestplates.steelVest);
    stalker.equipWeapon(WeaponPresets.shortSword);

    return [stalker];
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
        c.syncSnapshot = null;

        const ping = c.ping + (performance.now() - c.syncSnapshotTimestamp);

        const predictedPos = clientPos.add(clientVelocity.scale(ping * 0.001));

        c.controlledEntity.gameObject.setPosition(predictedPos.x, predictedPos.y);
        try {
          c.controlledEntity.gameObject.body.setVelocityX(clientVelocity.x);
          c.controlledEntity.gameObject.body.setVelocityY(clientVelocity.y);
        } catch (err) {
          throw err;
        }
      });
  }

  update() {
    this.entities.forEach(e => {
      e.update();
    });

    this.networkBots
      .filter(nb => !!(nb.controlledEntity as HumanoidEntity).getEquipment().weapon)
      .forEach(nb => nb.processAttack());
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
    player.socket.emit(ServerPackets.INIT_LEVEL, NetworkPacketSerializer.initLevel(this));

    this.entities.forEach(e => {
      player.socket.emit(...NetworkPacketSerializer.spawnEntity(e));
    });

    this.spawnPlayer(player, playerData);

    this.clients.push(player);
    this.playerNetworking.addPlayerInputListeners(player, playerData);
  }

  spawnPlayer(player: GameClient, playerData: PlayerDataSnapshot) {
    const existingPlayers = this.clients.filter(gc => gc !== player);
    const spawnedEntity = this.entitySpawner.spawnPlayer(player, playerData, new Phaser.Math.Vector2(0, 0));
    player.controlledEntity = spawnedEntity;

    existingPlayers.forEach(p => {
      p.socket.emit(...NetworkPacketSerializer.spawnEntity(spawnedEntity));
    });

    const playerPacket = NetworkPacketSerializer.spawnPlayer(spawnedEntity);
    playerPacket[1].inventory = player.inventory;

    player.socket.emit(...playerPacket);
  }

  broadcastPacket(packetType: ServerPackets, packet: any) {
    this.server.to(this.roomName).emit(packetType, packet);
  }

  registerNetworkBot(controller: ServerWrapperController) {
    if (!(controller.controlledEntity instanceof HumanoidEntity)) {
      console.log('REGISTER FAIL');
      return;
    }

    this.networkBots.push(controller);
    controller.controlledEntity.gameObject.on('destroy', () => {
      const controllerIndex = this.networkBots.indexOf(controller);

      if (controllerIndex >= 0) {
        this.networkBots.splice(controllerIndex, 1);
      }
    });
  }
}
