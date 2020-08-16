"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var phaser_1 = require("phaser");
var asset_service_1 = require("../gameServices/asset.service");
var networkEntitySpawner_1 = require("src/services/networkEntitySpawner");
var mapGrid_1 = require("src/core/mapGrid");
var serverPackets_1 = require("src/networkPackets/fromServer/serverPackets");
var level_loader_service_1 = require("../gameServices/level-loader.service");
var networkPacketSerializer_1 = require("src/services/networkPacketSerializer");
var NetworkLevel = /** @class */ (function (_super) {
    __extends(NetworkLevel, _super);
    function NetworkLevel(server, roomName) {
        var _this = _super.call(this, { key: 'networklevel' }) || this;
        _this.server = server;
        _this.roomName = roomName;
        _this.clients = [];
        return _this;
    }
    NetworkLevel.prototype.create = function () {
        this.mapGrid = new mapGrid_1.MapGrid(this, 'tileset');
        this.entitySpawner = new networkEntitySpawner_1.NetworkEntitySpawner(this);
    };
    NetworkLevel.prototype.preload = function () {
        asset_service_1.AssetService.loadBlockSprites(this.load);
        asset_service_1.AssetService.loadEntitySprites(this.load);
    };
    NetworkLevel.prototype.update = function () {
        this.entities.forEach(function (e) { return e.update(); });
    };
    NetworkLevel.prototype.addPlayer = function (player) {
        var _a;
        var existingPlayers = __spreadArrays(this.clients);
        player.socket.emit(serverPackets_1.ServerPackets.INIT_LEVEL, {
            locationName: this.levelName,
            levelData: level_loader_service_1.LevelLoaderService.exportLevel(this)
        });
        this.clients.push(player);
        this.entities.forEach(function (e) {
            var _a;
            (_a = player.socket).emit.apply(_a, networkPacketSerializer_1.NetworkPacketSerializer.spawnEntity(e));
        });
        var spawnedEntity = this.entitySpawner.spawnPlayer(player, new Phaser.Math.Vector2(0, 0));
        console.log('Existing players:');
        console.log(existingPlayers);
        existingPlayers.forEach(function (p) {
            var _a;
            (_a = p.socket).emit.apply(_a, networkPacketSerializer_1.NetworkPacketSerializer.spawnEntity(spawnedEntity));
        });
        (_a = player.socket).emit.apply(_a, networkPacketSerializer_1.NetworkPacketSerializer.spawnPlayer(spawnedEntity));
    };
    NetworkLevel.prototype.broadcastPacket = function (packetType, packet) {
        this.server.to(this.roomName).emit(packetType, packet);
    };
    return NetworkLevel;
}(phaser_1.Scene));
exports.NetworkLevel = NetworkLevel;
