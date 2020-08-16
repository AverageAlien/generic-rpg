import { ServerPackets } from '../networkPackets/fromServer/serverPackets';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { CharacterEntity } from '../gameData/gameplay/entities/characterEntity';
import { LevelLoaderService } from '../gameData/gameServices/level-loader.service';
export class NetworkPacketSerializer {
    static spawnEntity(ent) {
        let packetType = ServerPackets.SPAWN_ENTITY;
        const packet = {
            entityName: ent.entityName,
            faction: ent.faction,
            networkId: ent.networkId,
            position: ent.gameObject.body.position,
        };
        if (ent instanceof CharacterEntity) {
            packetType = ServerPackets.SPAWN_ENTITY_CHARACTER;
            const packetCharacter = packet;
            packetCharacter.health = ent.health;
            packetCharacter.maxHealth = ent.maxHealth;
            packetCharacter.speed = ent.speed;
            packetCharacter.level = ent.level;
        }
        if (ent instanceof HumanoidEntity) {
            packetType = ServerPackets.SPAWN_ENTITY_HUMANOID;
            const packetHumanoid = packet;
            packetHumanoid.armor = ent.armor;
        }
        return [packetType, packet];
    }
    static spawnPlayer(ent) {
        return this.spawnEntity(ent);
    }
    static initLevel(levelScene) {
        return {
            locationName: levelScene.levelName,
            levelData: LevelLoaderService.exportLevel(levelScene),
        };
    }
}
//# sourceMappingURL=networkPacketSerializer.js.map