import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ClientLevel } from '../scenes/clientLevel';
import { Subject } from 'rxjs';
import { ServerPackets } from '../networking/networkPackets/fromServer/serverPackets';
import { PacketInitLevel } from '../networking/networkPackets/fromServer/initLevel';
import { LevelLoaderService } from '../gameServices/level-loader.service';
import { ClientPackets } from '../networking/networkPackets/fromClient/clientPackets';
import { PacketClientInit } from '../networking/networkPackets/fromClient/clientInit';
import { PacketSpawnEntityCharacter, PacketSpawnEntityHumanoid } from '../networking/networkPackets/fromServer/spawnEntity';
import { PacketSpawnPlayer } from '../networking/networkPackets/fromServer/spawnPlayer';
import { PacketPlayerInputMove } from '../networking/networkPackets/fromServer/playerInputMove';
import { PacketMoveInput } from '../networking/networkPackets/fromClient/moveInput';
import { PacketSyncSnapshot } from '../networking/networkPackets/fromServer/syncSnapshot';
import { PingService } from './ping.service';
import { PacketClientSync } from '../networking/networkPackets/fromClient/clientSync';
import { PacketPlayerLeft } from '../networking/networkPackets/fromServer/playerLeft';
import { Armor } from '../gameplay/items/armor';
import { PacketEquipArmor } from '../networking/networkPackets/fromClient/equipArmor';
import { PacketArmorEquipped } from '../networking/networkPackets/fromServer/armorEquipped';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { Weapon } from '../gameplay/items/weapon';
import { PacketEquipWeapon } from '../networking/networkPackets/fromClient/equipWeapon';
import { PacketWeaponEquipped } from '../networking/networkPackets/fromServer/weaponEquipped';

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {
  public chosenUsername: string;

  private readonly syncPositionEpsilonSqr = 256;
  private readonly syncVelocityEpsilonSqr = 0;

  private syncSnapshot: PacketSyncSnapshot;
  private snapshotTimestamp = 0;

  private spawnEntityCharacter$ = new Subject<PacketSpawnEntityCharacter>();
  private spawnEntityHumanoid$ = new Subject<PacketSpawnEntityHumanoid>();
  private spawnPlayer$ = new Subject<PacketSpawnPlayer>();
  private playerInputMove$ = new Subject<PacketPlayerInputMove>();
  private playerEquippedArmor$ = new Subject<PacketArmorEquipped>();
  private playerLeft$ = new Subject<PacketPlayerLeft>();

  public get spawnEntityCharacter() {
    return this.spawnEntityCharacter$.asObservable();
  }
  public get spawnEntityHumanoid() {
    return this.spawnEntityHumanoid$.asObservable();
  }
  public get spawnPlayer() {
    return this.spawnPlayer$.asObservable();
  }
  public get playerInputMove() {
    return this.playerInputMove$.asObservable();
  }
  public get playerEquippedArmor() {
    return this.playerEquippedArmor$.asObservable();
  }
  public get playerLeft() {
    return this.playerLeft$.asObservable();
  }

  constructor(private socket: Socket, private pingService: PingService) { }

  loadLevel(levelScene: ClientLevel) {
    this.socket.fromEvent<PacketInitLevel>(ServerPackets.INIT_LEVEL)
      .subscribe(packet => {
        levelScene.levelName = packet.locationName;
        LevelLoaderService.importlevel(packet.levelData, levelScene);
      });

    this.socket.emit(ClientPackets.CLIENT_INIT, {
      username: this.chosenUsername
    } as PacketClientInit);

    this.startListen(levelScene);
  }

  sendMovement(movementVector: Phaser.Math.Vector2) {
    this.socket.emit(ClientPackets.MOVE_INPUT, {
      moveX: movementVector.x,
      moveY: movementVector.y
    } as PacketMoveInput);
  }

  sendEquipArmor(armor: Armor) {
    console.log('EQUIP ARMOR');
    this.socket.emit(ClientPackets.EQUIP_ARMOR, { armor } as PacketEquipArmor);
  }

  sendEquipWeapon(weapon: Weapon) {
    console.log('EQUIP WEP');
    this.socket.emit(ClientPackets.EQUIP_WEAPON, { weapon } as PacketEquipWeapon);
  }

  synchronizeWithServer(levelScene: ClientLevel) {
    if (!this.syncSnapshot) {
      return;
    }

    const ping = this.pingService.Ping + (performance.now() - this.snapshotTimestamp);

    this.syncSnapshot.entities.forEach(es => {
      const entity = levelScene.entities.find(e => e.networkId === es.networkId);
      if (!entity) { return; }
      const gameObject = entity.gameObject as unknown as Phaser.GameObjects.Components.Transform;

      const serverPos = new Phaser.Math.Vector2(es.positionX, es.positionY);
      const serverVelocity = new Phaser.Math.Vector2(es.velocityX, es.velocityY);
      const clientVelocity = new Phaser.Math.Vector2(entity.gameObject.body.velocity.x, entity.gameObject.body.velocity.y);

      const predictedPos = new Phaser.Math.Vector2(serverPos)
        .add(new Phaser.Math.Vector2(serverVelocity)
          .scale(ping * 0.001));
      const posError = predictedPos.distanceSq(new Phaser.Math.Vector2(gameObject.x, gameObject.y));
      if (levelScene.player !== entity && posError > 1 && posError > clientVelocity.lengthSq() * 0.5) {
        levelScene.tweens.getTweensOf(gameObject).forEach(t => { console.log(t); t.stop(); });
        if (posError > 2048) {
          gameObject.setPosition(predictedPos.x, predictedPos.y);
        } else {
          levelScene.tweens.getTweensOf(gameObject).forEach(t => t.stop());
          levelScene.tweens.add({
            targets: gameObject,
            x: {
              from: gameObject.x,
              to: predictedPos.x
            },
            y: {
              from: gameObject.y,
              to: predictedPos.y
            },
            ease: 'Sine.easeOut',
            duration: 250
          });
        }
      } else if (levelScene.player === entity) {
        this.socket.emit(ClientPackets.CLIENT_SYNC, {
          positionX: gameObject.x,
          positionY: gameObject.y,
          velocityX: entity.gameObject.body.velocity.x,
          velocityY: entity.gameObject.body.velocity.y,
        } as PacketClientSync);
      }

      // const velocityError = entity.gameObject.body.velocity.distanceSq(serverVelocity);
      if (levelScene.player !== entity) {
        entity.gameObject.body.setVelocity(es.velocityX, es.velocityY);
      }
    });

    this.syncSnapshot = null;
  }

  private startListen(clientLevel: ClientLevel) {
    this.socket.fromEvent<PacketSpawnEntityCharacter>(ServerPackets.SPAWN_ENTITY_CHARACTER)
      .subscribe(packet => {
        this.spawnEntityCharacter$.next(packet);
      });

    this.socket.fromEvent<PacketSpawnEntityHumanoid>(ServerPackets.SPAWN_ENTITY_HUMANOID)
      .subscribe(packet => {
        this.spawnEntityHumanoid$.next(packet);
      });

    this.socket.fromEvent<PacketSpawnPlayer>(ServerPackets.SPAWN_PLAYER)
      .subscribe(packet => {
        this.spawnPlayer$.next(packet);
      });

    this.socket.fromEvent<PacketPlayerInputMove>(ServerPackets.PLAYER_INPUT_MOVE)
      .subscribe(packet => {
        this.playerInputMove$.next(packet);
      });

    this.socket.fromEvent<PacketArmorEquipped>(ServerPackets.ARMOR_EQUIPPED)
      .subscribe(packet => {
        console.log('<<< ARMOR_EQUIPPED');
        const ent = clientLevel.entities.find(e => e.networkId === packet.networkId);
        if (!!ent && ent instanceof HumanoidEntity) {
          ent.equipArmor(packet.armor);
        }
      });

    this.socket.fromEvent<PacketWeaponEquipped>(ServerPackets.WEAPON_EQUIPPED)
      .subscribe(packet => {
        console.log('<<< WEAPON_EQUIPPED');
        const ent = clientLevel.entities.find(e => e.networkId === packet.networkId);
        if (!!ent && ent instanceof HumanoidEntity) {
          ent.equipWeapon(packet.weapon);
        }
      });

    this.socket.fromEvent<PacketSyncSnapshot>(ServerPackets.SYNC_SNAPSHOT)
      .subscribe(packet => {
        this.syncSnapshot = packet;
        this.snapshotTimestamp = performance.now();
      });

    this.socket.fromEvent<PacketPlayerLeft>(ServerPackets.PLAYER_LEFT)
      .subscribe(packet => {
        this.playerLeft$.next(packet);
      });
  }
}
