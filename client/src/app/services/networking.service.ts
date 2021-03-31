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
  public get playerLeft() {
    return this.playerLeft$.asObservable();
  }

  constructor(private socket: Socket, private pingService: PingService) { }

  loadLevel(levelScene: ClientLevel) {
    this.socket.fromEvent<PacketInitLevel>(ServerPackets.INIT_LEVEL)
      .subscribe(packet => {
        // console.log(`<< ${ServerPackets.INIT_LEVEL}`);
        levelScene.levelName = packet.locationName;
        LevelLoaderService.importlevel(packet.levelData, levelScene);
      });

    this.socket.emit(ClientPackets.CLIENT_INIT, {
      username: this.chosenUsername
    } as PacketClientInit);
    // console.log(`>> ${ClientPackets.CLIENT_INIT}`);

    this.startListen();
  }

  sendMovement(movementVector: Phaser.Math.Vector2) {
    this.socket.emit(ClientPackets.MOVE_INPUT, {
      moveX: movementVector.x,
      moveY: movementVector.y
    } as PacketMoveInput);
    // console.log(`>> ${ClientPackets.MOVE_INPUT}`);
  }

  synchronizeWithServer(levelScene: ClientLevel) {
    if (!this.syncSnapshot) {
      return;
    }

    const ping = this.pingService.Ping + (performance.now() - this.snapshotTimestamp);

    // console.log(`FIXED PING: ${ping}`);

    this.syncSnapshot.entities.forEach(es => {
      const entity = levelScene.entities.find(e => e.networkId === es.networkId);
      if (!entity) { return; }
      const gameObject = entity.gameObject as unknown as Phaser.GameObjects.Components.Transform;

      const serverPos = new Phaser.Math.Vector2(es.positionX, es.positionY);
      const serverVelocity = new Phaser.Math.Vector2(es.velocityX, es.velocityY);

      const predictedPos = new Phaser.Math.Vector2(serverPos)
        .add(new Phaser.Math.Vector2(serverVelocity)
          .scale(ping * 0.001));
      const posError = predictedPos.distanceSq(new Phaser.Math.Vector2(gameObject.x, gameObject.y));
      console.log(`POSITION ERROR: ${posError}`);
      if (levelScene.player !== entity && posError > serverVelocity.lengthSq() * 0.5) {
        console.log(`UPDATING ENTITY POS: ${predictedPos.x} ${predictedPos.y}`);
        gameObject.setPosition(predictedPos.x, predictedPos.y);
      } else if (levelScene.player === entity) {
        this.socket.emit(ClientPackets.CLIENT_SYNC, {
          positionX: gameObject.x,
          positionY: gameObject.y,
          velocityX: entity.gameObject.body.velocity.x,
          velocityY: entity.gameObject.body.velocity.y,
        } as PacketClientSync);
      }

      const velocityError = entity.gameObject.body.velocity.distanceSq(serverVelocity);
      // console.log(`VELOCITY ERROR: ${velocityError}`);
      if (levelScene.player !== entity) {
        // console.log(`FIXING VELOCITY ERROR`);
        entity.gameObject.body.setVelocity(es.velocityX, es.velocityY);
      }
    });

    // console.log(`PING: ${this.pingService.Ping}`);

    this.syncSnapshot = null;
  }

  private startListen() {
    this.socket.fromEvent<PacketSpawnEntityCharacter>(ServerPackets.SPAWN_ENTITY_CHARACTER)
      .subscribe(packet => {
        // console.log(`<< ${ServerPackets.SPAWN_ENTITY_CHARACTER}`);
        this.spawnEntityCharacter$.next(packet);
      });

    this.socket.fromEvent<PacketSpawnEntityHumanoid>(ServerPackets.SPAWN_ENTITY_HUMANOID)
      .subscribe(packet => {
        // console.log(`<< ${ServerPackets.SPAWN_ENTITY_HUMANOID}`);
        // console.log(packet);
        this.spawnEntityHumanoid$.next(packet);
      });

    this.socket.fromEvent<PacketSpawnPlayer>(ServerPackets.SPAWN_PLAYER)
      .subscribe(packet => {
        // console.log(`<< ${ServerPackets.SPAWN_PLAYER}`);
        this.spawnPlayer$.next(packet);
      });

    this.socket.fromEvent<PacketPlayerInputMove>(ServerPackets.PLAYER_INPUT_MOVE)
      .subscribe(packet => {
        // console.log(`<< ${ServerPackets.PLAYER_INPUT_MOVE}; ${packet.moveX}; ${packet.moveY}`);
        this.playerInputMove$.next(packet);
      });

    this.socket.fromEvent<PacketSyncSnapshot>(ServerPackets.SYNC_SNAPSHOT)
      .subscribe(packet => {
        // console.log(`<< ${ServerPackets.SYNC_SNAPSHOT}`);
        this.syncSnapshot = packet;
        this.snapshotTimestamp = performance.now();
      });

    this.socket.fromEvent<PacketPlayerLeft>(ServerPackets.PLAYER_LEFT)
      .subscribe(packet => {
        this.playerLeft$.next(packet);
      });
  }
}
