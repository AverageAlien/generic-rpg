import * as Phaser from 'phaser';
import { NetworkLevel } from '../gameData/scenes/networkLevel';
import { Constants } from '../core/constants';
import { fromEvent } from 'rxjs';
import { ClientPackets } from '../networkPackets/fromClient/clientPackets';
import { Room } from '../models/room';
const defaultRoom = 'test01';
export class RoomService {
    constructor(server) {
        this.server = server;
        this.rooms = [];
        server.on('connection', socket => {
            console.log(`${socket.client.id} connected.`);
            let oldRoomName;
            fromEvent(socket, ClientPackets.CLIENT_INIT)
                .subscribe(packet => {
                socket.leaveAll();
                socket.join('test_01');
                this.playerJoinRoom(socket, packet.username, 'test_01', oldRoomName);
                oldRoomName = 'test_01';
            });
        });
    }
    playerJoinRoom(socket, playerName, roomName, oldRoomName) {
        if (oldRoomName) {
            const oldRoom = this.rooms.find(r => r.roomName === oldRoomName);
            if (oldRoom) {
                const oldPlayer = oldRoom.location.clients.findIndex(gc => gc.socket === socket);
                if (oldPlayer >= 0) {
                    oldRoom.location.clients.splice(oldPlayer, 1);
                }
            }
        }
        let targetRoom = this.rooms.find(r => r.roomName === roomName);
        if (!targetRoom) {
            targetRoom = this.createRoom(roomName);
        }
        targetRoom.location.addPlayer({
            nickname: playerName,
            socket
        });
    }
    createRoom(roomName) {
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
//# sourceMappingURL=roomService.js.map