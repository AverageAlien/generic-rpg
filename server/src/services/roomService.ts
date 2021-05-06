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

const defaultRoom = 'test01';
global.phaserOnNodeFPS = 30;

export class RoomService {
  private rooms: Room[] = [];

  constructor(private server: io.Server) {
    server.on('connection', socket => {
      console.log(`${socket.client.id} connected.`);
      let oldRoomName: string;

      fromEvent<PacketClientInit>(socket, ClientPackets.CLIENT_INIT)
        .subscribe(packet => {
          console.log(`<< ${ClientPackets.CLIENT_INIT}`);
          socket.leaveAll();

          const roomName = 'test_01';

          socket.join(roomName);
          this.playerJoinRoom(socket, packet.username, roomName, oldRoomName);
          oldRoomName = roomName;
        });
    });
  }

  public playerJoinRoom(socket: io.Socket, playerName: string, roomName: string, oldRoomName?: string) {
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

        targetRoom.location.addPlayer({
          nickname: playerName,
          socket,
          socketSubscriptions: [],
          ping: 0,
        });
      });
  }

  private createRoom(roomName: string): Room {
    const room = new Room();
    room.roomName = roomName;

    room.location = new NetworkLevel(this.server, roomName);

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
