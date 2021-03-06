import * as io from 'socket.io';
import '@geckos.io/phaser-on-nodejs';
import * as Phaser from 'phaser';
import { fromEvent } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import cookie from 'cookie';

import { GLOBAL_AUTH_COOKIENAME } from '..';
import { Constants } from '../core/constants';
import { NetworkLevel } from '../gameData/scenes/networkLevel';
import { ClientPackets } from '../networkPackets/fromClient/clientPackets';
import { PacketClientInit } from '../networkPackets/fromClient/clientInit';
import { Room } from '../models/room';
import { PlayerDataService } from './playerDataService';
import { UserDataDTO } from '../database/models/userDataDTO';
import { PlayerDataSnapshot } from '../models/userDataSnapshot';
import { AuthenticationService } from './authService';

const defaultRoom = 'test01';
global.phaserOnNodeFPS = 30;

export class RoomService {
  private rooms: Room[] = [];

  constructor(private server: io.Server, private playerDataService: PlayerDataService) {
    server.on('connection', socket => {
      const authCookie = cookie.parse(socket.request.headers.cookie)[GLOBAL_AUTH_COOKIENAME];
      const tokenPayload = AuthenticationService.getTokenPayload(authCookie);

      if (tokenPayload === null) {
        socket.disconnect(true);
        return;
      }

      let oldRoomName: string;

      fromEvent<PacketClientInit>(socket, ClientPackets.CLIENT_INIT)
        .subscribe(packet => {
          socket.leaveAll();

          this.playerDataService.loadPlayerData(tokenPayload.username).subscribe(userData => {
            socket.join(userData.location);
            this.playerJoinRoom(socket, tokenPayload.username, userData, userData.location);
            oldRoomName = userData.location;
          });
        });
    });
  }

  public playerJoinRoom(socket: io.Socket, playerName: string, userData: UserDataDTO, oldRoomName?: string) {
    const roomName = userData.location;

    if (oldRoomName) {
      const oldRoom = this.rooms.find(r => r.roomName === oldRoomName);

      if (oldRoom) {
        const oldPlayer = oldRoom.location.clients.findIndex(gc => gc.socket === socket);

        if (oldPlayer >= 0) {
          oldRoom.location.clients.splice(oldPlayer, 1);
        }
      }
    }

    let targetRoom = this.rooms.find(r => r.roomName === roomName)

    if (!targetRoom) {
      targetRoom = this.createRoom(roomName);
    }

    targetRoom.location.roomReady.pipe(
      filter(ready => ready),
      take(1))
      .subscribe(ready => {
        const playerData: PlayerDataSnapshot = JSON.parse(userData.playerdata);

        targetRoom.location.addPlayer({
          nickname: playerName,
          inventory: playerData.inventory,
          socket,
          socketSubscriptions: [],
          ping: 0,
        }, playerData);
      });
  }

  private createRoom(roomName: string): Room {
    const room = new Room();
    room.roomName = roomName;

    room.location = new NetworkLevel(this.server, this.playerDataService, roomName);

    const gameConfig = {
      type: Phaser.HEADLESS,
      height: Constants.Screen.SCREEN_H,
      width: Constants.Screen.SCREEN_W,
      scene: [room.location],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
      },
      dom: {
        createContainer: true,
      },
    };

    room.game = new Phaser.Game(gameConfig);

    this.rooms.push(room);
    return room;
  }
}
