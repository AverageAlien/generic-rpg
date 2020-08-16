import { Scene } from 'phaser';
import { AssetService } from '../gameServices/asset.service';
import { NetworkEntitySpawner } from '../../services/networkEntitySpawner';
import { MapGrid } from '../../core/mapGrid';
import { ServerPackets } from '../../networkPackets/fromServer/serverPackets';
import { LevelLoaderService } from '../../gameData/gameServices/level-loader.service';
import { NetworkPacketSerializer } from '../../services/networkPacketSerializer';
export class NetworkLevel extends Scene {
    constructor(server, roomName) {
        super({ key: 'networklevel' });
        this.server = server;
        this.roomName = roomName;
        this.clients = [];
    }
    create() {
        this.mapGrid = new MapGrid(this, 'tileset');
        this.entitySpawner = new NetworkEntitySpawner(this);
    }
    preload() {
        AssetService.loadBlockSprites(this.load);
        AssetService.loadEntitySprites(this.load);
    }
    update() {
        this.entities.forEach(e => e.update());
    }
    addPlayer(player) {
        const existingPlayers = [...this.clients];
        player.socket.emit(ServerPackets.INIT_LEVEL, {
            locationName: this.levelName,
            levelData: LevelLoaderService.exportLevel(this)
        });
        this.clients.push(player);
        this.entities.forEach(e => {
            player.socket.emit(...NetworkPacketSerializer.spawnEntity(e));
        });
        const spawnedEntity = this.entitySpawner.spawnPlayer(player, new Phaser.Math.Vector2(0, 0));
        console.log('Existing players:');
        console.log(existingPlayers);
        existingPlayers.forEach(p => {
            p.socket.emit(...NetworkPacketSerializer.spawnEntity(spawnedEntity));
        });
        player.socket.emit(...NetworkPacketSerializer.spawnPlayer(spawnedEntity));
    }
    broadcastPacket(packetType, packet) {
        this.server.to(this.roomName).emit(packetType, packet);
    }
}
//# sourceMappingURL=networkLevel.js.map