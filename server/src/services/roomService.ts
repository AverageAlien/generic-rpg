import * as io from 'socket.io';
import '@geckos.io/phaser-on-nodejs';
import * as Phaser from 'phaser';
import { NetworkLevel } from '../gameData/scenes/networkLevel';
import { Constants } from '../core/constants';
import { fromEvent, timer } from 'rxjs';
import { ClientPackets } from '../networkPackets/fromClient/clientPackets';
import { PacketClientInit } from '../networkPackets/fromClient/clientInit';
import { Room } from '../models/room';
import { take, filter } from 'rxjs/operators';
import { PlayerDataService } from './playerDataService';
import { UserDataDTO } from '../database/models/userDataDTO';
import { PlayerDataSnapshot } from '../models/userDataSnapshot';

const defaultRoom = 'test01';
global.phaserOnNodeFPS = 30;

export class RoomService {
  private rooms: Room[] = [];

  constructor(private server: io.Server, private playerDataService: PlayerDataService) {
    server.on('connection', socket => {
      console.log(`${socket.client.id} connected.`);
      let oldRoomName: string;

      fromEvent<PacketClientInit>(socket, ClientPackets.CLIENT_INIT)
        .subscribe(packet => {
          console.log(`<< ${ClientPackets.CLIENT_INIT}`);
          socket.leaveAll();

          const roomName = 'test_01';

          this.playerDataService.loadPlayerData(packet.username).subscribe(userData => {
            socket.join(roomName);
            this.playerJoinRoom(socket, packet.username, userData, oldRoomName);
            oldRoomName = roomName;
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
        console.log('room ready');

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
