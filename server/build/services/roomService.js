"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
require("@geckos.io/phaser-on-nodejs");
const Phaser = __importStar(require("phaser"));
const networkLevel_1 = require("../gameData/scenes/networkLevel");
const constants_1 = require("../core/constants");
const rxjs_1 = require("rxjs");
const clientPackets_1 = require("../networkPackets/fromClient/clientPackets");
const room_1 = require("../models/room");
const operators_1 = require("rxjs/operators");
const defaultRoom = 'test01';
global.phaserOnNodeFPS = 30;
class RoomService {
    constructor(server) {
        this.server = server;
        this.rooms = [];
        server.on('connection', socket => {
            console.log(`${socket.client.id} connected.`);
            let oldRoomName;
            rxjs_1.fromEvent(socket, clientPackets_1.ClientPackets.CLIENT_INIT)
                .subscribe(packet => {
                console.log(`<< ${clientPackets_1.ClientPackets.CLIENT_INIT}`);
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
        targetRoom.location.roomReady.pipe(operators_1.filter(ready => ready), operators_1.take(1))
            .subscribe(ready => {
            console.log('room ready');
            targetRoom.location.addPlayer({
                nickname: playerName,
                socket
            });
        });
    }
    createRoom(roomName) {
        const room = new room_1.Room();
        room.roomName = roomName;
        room.location = new networkLevel_1.NetworkLevel(this.server, roomName);
        const gameConfig = {
            type: Phaser.HEADLESS,
            height: constants_1.Constants.Screen.SCREEN_H,
            width: constants_1.Constants.Screen.SCREEN_W,
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
exports.RoomService = RoomService;
