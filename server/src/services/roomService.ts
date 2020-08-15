import * as io from 'socket.io';
import { Room } from 'src/models/room';
import { NetworkLevel } from 'src/gameData/scenes/networkLevel';
import { Constants } from 'src/core/constants';

const defaultRoom = 'test01';

export class RoomService {
  private rooms: Room[] = [];

  constructor(private server: io.Server) {}

  public playerJoinRoom(socket: io.Socket, roomName: string, oldRoomName?: string) {
    if (oldRoomName) {
      const oldRoom = this.rooms.find((r) => r.roomName === oldRoomName);

      if (oldRoom) {
        const oldPlayer = oldRoom.location.clients.findIndex(gc => gc.socket === socket);

        if (oldPlayer >= 0) {
          oldRoom.location.clients.splice(oldPlayer, 1);
        }
      }
    }
  }

  private createRoom(roomName: string) {
    const room = new Room();
    room.roomName = roomName;

    room.location = new NetworkLevel(this.server);

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
  }
}
