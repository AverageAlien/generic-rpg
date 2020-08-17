"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkLevel = void 0;
const phaser_1 = require("phaser");
const asset_service_1 = require("../gameServices/asset.service");
const networkEntitySpawner_1 = require("../../services/networkEntitySpawner");
const mapGrid_1 = require("../../core/mapGrid");
const serverPackets_1 = require("../../networkPackets/fromServer/serverPackets");
const level_loader_service_1 = require("../../gameData/gameServices/level-loader.service");
const networkPacketSerializer_1 = require("../../services/networkPacketSerializer");
const locationList_1 = require("../../serverCore/locationList");
const rxjs_1 = require("rxjs");
class NetworkLevel extends phaser_1.Scene {
    constructor(server, roomName) {
        super({ key: 'networklevel' });
        this.server = server;
        this.roomName = roomName;
        this.entities = [];
        this.clients = [];
        this.roomReady$ = new rxjs_1.BehaviorSubject(false);
    }
    get roomReady() {
        return this.roomReady$.asObservable();
    }
    create() {
        this.mapGrid = new mapGrid_1.MapGrid(this, 'tileset');
        this.levelLoader = new level_loader_service_1.LevelLoaderService(this);
        this.levelLoader.importlevel(locationList_1.LocationList.get(this.roomName).levelData);
        this.entitySpawner = new networkEntitySpawner_1.NetworkEntitySpawner(this);
        this.roomReady$.next(true);
    }
    preload() {
        asset_service_1.AssetService.loadBlockSprites(this.load);
        asset_service_1.AssetService.loadEntitySprites(this.load);
    }
    update() {
        this.entities.forEach(e => {
            e.update();
            // console.log(`entity ${e.entityName} position: ${e.gameObject.body.position.x}; ${e.gameObject.body.position.y}`);
        });
    }
    addPlayer(player) {
        const existingPlayers = [...this.clients];
        player.socket.emit(serverPackets_1.ServerPackets.INIT_LEVEL, networkPacketSerializer_1.NetworkPacketSerializer.initLevel(this));
        console.log(`>> ${serverPackets_1.ServerPackets.INIT_LEVEL}`);
        this.clients.push(player);
        this.entities.forEach(e => {
            player.socket.emit(...networkPacketSerializer_1.NetworkPacketSerializer.spawnEntity(e));
            console.log(`>> ${serverPackets_1.ServerPackets.SPAWN_ENTITY} (spawn all present entities for new player)`);
        });
        const spawnedEntity = this.entitySpawner.spawnPlayer(player, new Phaser.Math.Vector2(0, 0));
        console.log(`spawned entity pos: ${spawnedEntity.gameObject.body.x}; ${spawnedEntity.gameObject.body.y}`);
        console.log('Existing players:');
        console.log(existingPlayers);
        existingPlayers.forEach(p => {
            p.socket.emit(...networkPacketSerializer_1.NetworkPacketSerializer.spawnEntity(spawnedEntity));
            console.log(`>> ${serverPackets_1.ServerPackets.SPAWN_ENTITY} (spawn new player for existing players)`);
        });
        player.socket.emit(...networkPacketSerializer_1.NetworkPacketSerializer.spawnPlayer(spawnedEntity));
        console.log(`>> ${serverPackets_1.ServerPackets.SPAWN_PLAYER} (tell player to spawn himself)`);
    }
    broadcastPacket(packetType, packet) {
        this.server.to(this.roomName).emit(packetType, packet);
    }
}
exports.NetworkLevel = NetworkLevel;
