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

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {
  public chosenUsername: string;

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
        levelScene.levelName = packet.locationName;
        LevelLoaderService.importlevel(packet.levelData, levelScene);
      });

    this.socket.emit(ClientPackets.CLIENT_INIT, {
      username: this.chosenUsername
    } as PacketClientInit);

    this.startListen();
  }

  sendMovement(movementVector: Phaser.Math.Vector2) {
    this.socket.emit(ClientPackets.MOVE_INPUT, movementVector);
  }

  private startListen() {
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
  }
}
