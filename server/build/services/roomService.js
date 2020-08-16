"use strict";
exports.__esModule = true;
var Phaser = require("phaser");
var networkLevel_1 = require("../gameData/scenes/networkLevel");
var constants_1 = require("../core/constants");
var rxjs_1 = require("rxjs");
var clientPackets_1 = require("../networkPackets/fromClient/clientPackets");
var room_1 = require("../models/room");
var defaultRoom = 'test01';
var RoomService = /** @class */ (function () {
    function RoomService(server) {
        var _this = this;
        this.server = server;
        this.rooms = [];
        server.on('connection', function (socket) {
            console.log(socket.client.id + " connected.");
            var oldRoomName;
            rxjs_1.fromEvent(socket, clientPackets_1.ClientPackets.CLIENT_INIT)
                .subscribe(function (packet) {
                socket.leaveAll();
                socket.join('test_01');
                _this.playerJoinRoom(socket, packet.username, 'test_01', oldRoomName);
                oldRoomName = 'test_01';
            });
        });
    }
    RoomService.prototype.playerJoinRoom = function (socket, playerName, roomName, oldRoomName) {
        if (oldRoomName) {
            var oldRoom = this.rooms.find(function (r) { return r.roomName === oldRoomName; });
            if (oldRoom) {
                var oldPlayer = oldRoom.location.clients.findIndex(function (gc) { return gc.socket === socket; });
                if (oldPlayer >= 0) {
                    oldRoom.location.clients.splice(oldPlayer, 1);
                }
            }
        }
        var targetRoom = this.rooms.find(function (r) { return r.roomName === roomName; });
        if (!targetRoom) {
            targetRoom = this.createRoom(roomName);
        }
        targetRoom.location.addPlayer({
            nickname: playerName,
            socket: socket
        });
    };
    RoomService.prototype.createRoom = function (roomName) {
        var room = new room_1.Room();
        room.roomName = roomName;
        room.location = new networkLevel_1.NetworkLevel(this.server, roomName);
        var gameConfig = {
            type: Phaser.HEADLESS,
            height: constants_1.Constants.Screen.SCREEN_H,
            width: constants_1.Constants.Screen.SCREEN_W,
            scene: [room.location],
            parent: 'gameContainer',
            physics: {
                "default": 'arcade'
            },
            dom: {
                createContainer: true
            }
        };
        room.game = new Phaser.Game(gameConfig);
        this.rooms.push(room);
        return room;
    };
    return RoomService;
}());
exports.RoomService = RoomService;
