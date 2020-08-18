import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { NetworkController } from '../gameplay/controllers/networkController';
import { ClientLevel } from '../scenes/clientLevel';
import { fromEvent, Subject } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {
  public chosenUsername: string;

  private syncSnapshot: PacketSyncSnapshot;
  private spawnEntityCharacter$ = new Subject<PacketSpawnEntityCharacter>();
  private spawnEntityHumanoid$ = new Subject<PacketSpawnEntityHumanoid>();
  private spawnPlayer$ = new Subject<PacketSpawnPlayer>();
  private playerInputMove$ = new Subject<PacketPlayerInputMove>();

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

  constructor(private socket: Socket) { }

  loadLevel(levelScene: ClientLevel) {
    this.socket.fromEvent<PacketInitLevel>(ServerPackets.INIT_LEVEL)
      .subscribe(packet => {
        console.log(`<< ${ServerPackets.INIT_LEVEL}`);
        levelScene.levelName = packet.locationName;
        LevelLoaderService.importlevel(packet.levelData, levelScene);
      });

    this.socket.emit(ClientPackets.CLIENT_INIT, {
      username: this.chosenUsername
    } as PacketClientInit);
    console.log(`>> ${ClientPackets.CLIENT_INIT}`);

    this.startListen();
  }

  sendMovement(movementVector: Phaser.Math.Vector2) {
    this.socket.emit(ClientPackets.MOVE_INPUT, {
      moveX: movementVector.x,
      moveY: movementVector.y
    } as PacketMoveInput);
    console.log(`>> ${ClientPackets.MOVE_INPUT}`);
  }

  synchronizeWithServer(levelScene: ClientLevel) {
    if (!this.syncSnapshot) {
      return;
    }

    this.syncSnapshot.entities.forEach(es => {
      const entity = levelScene.entities.find(e => e.networkId === es.networkId);
      if (!entity) { return; }

      (entity.gameObject as any).setPosition(es.positionX, es.positionY);
      entity.gameObject.body.setVelocity(es.velocityX, es.velocityY);
    });

    this.syncSnapshot = null;
  }

  private startListen() {
    this.socket.fromEvent<PacketSpawnEntityCharacter>(ServerPackets.SPAWN_ENTITY_CHARACTER)
      .subscribe(packet => {
        console.log(`<< ${ServerPackets.SPAWN_ENTITY_CHARACTER}`);
        this.spawnEntityCharacter$.next(packet);
      });

    this.socket.fromEvent<PacketSpawnEntityHumanoid>(ServerPackets.SPAWN_ENTITY_HUMANOID)
      .subscribe(packet => {
        console.log(`<< ${ServerPackets.SPAWN_ENTITY_HUMANOID}`);
        console.log(packet);
        this.spawnEntityHumanoid$.next(packet);
      });

    this.socket.fromEvent<PacketSpawnPlayer>(ServerPackets.SPAWN_PLAYER)
      .subscribe(packet => {
        console.log(`<< ${ServerPackets.SPAWN_PLAYER}`);
        this.spawnPlayer$.next(packet);
      });

    this.socket.fromEvent<PacketPlayerInputMove>(ServerPackets.PLAYER_INPUT_MOVE)
      .subscribe(packet => {
        console.log(`<< ${ServerPackets.PLAYER_INPUT_MOVE}; ${packet.moveX}; ${packet.moveY}`);
        this.playerInputMove$.next(packet);
      });

    this.socket.fromEvent<PacketSyncSnapshot>(ServerPackets.SYNC_SNAPSHOT)
      .subscribe(packet => {
        console.log(`<< ${ServerPackets.SYNC_SNAPSHOT}`);
        this.syncSnapshot = packet;
      });
  }
}
