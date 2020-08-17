"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkPacketSerializer = void 0;
const serverPackets_1 = require("../networkPackets/fromServer/serverPackets");
const humanoidEntity_1 = require("../gameData/gameplay/entities/humanoidEntity");
const characterEntity_1 = require("../gameData/gameplay/entities/characterEntity");
class NetworkPacketSerializer {
    static spawnEntity(ent) {
        let packetType = serverPackets_1.ServerPackets.SPAWN_ENTITY;
        const packet = {
            entityName: ent.entityName,
            faction: ent.faction,
            networkId: ent.networkId,
            positionX: ent.gameObject.body.position.x,
            positionY: ent.gameObject.body.position.y
        };
        if (ent instanceof characterEntity_1.CharacterEntity) {
            packetType = serverPackets_1.ServerPackets.SPAWN_ENTITY_CHARACTER;
            const packetCharacter = packet;
            packetCharacter.health = ent.health;
            packetCharacter.maxHealth = ent.maxHealth;
            packetCharacter.speed = ent.speed;
            packetCharacter.level = ent.level;
        }
        if (ent instanceof humanoidEntity_1.HumanoidEntity) {
            packetType = serverPackets_1.ServerPackets.SPAWN_ENTITY_HUMANOID;
            const packetHumanoid = packet;
            packetHumanoid.armor = ent.armor;
        }
        return [packetType, packet];
    }
    static spawnPlayer(ent) {
        return [serverPackets_1.ServerPackets.SPAWN_PLAYER, this.spawnEntity(ent)[1]];
    }
    static initLevel(levelScene) {
        return {
            locationName: levelScene.levelName,
            levelData: levelScene.levelLoader.exportLevel(),
        };
    }
}
exports.NetworkPacketSerializer = NetworkPacketSerializer;
