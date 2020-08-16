import { Entity } from 'src/gameData/gameplay/entities/baseEntity';
import { ServerPackets } from 'src/networkPackets/fromServer/serverPackets';
import {
  PacketSpawnEntity,
  PacketSpawnEntityHumanoid,
  PacketSpawnEntityCharacter,
} from 'src/networkPackets/fromServer/spawnEntity';
import { HumanoidEntity } from 'src/gameData/gameplay/entities/humanoidEntity';
import { CharacterEntity } from 'src/gameData/gameplay/entities/characterEntity';
import { LevelScene } from 'src/core/levelScene';
import { PacketInitLevel } from 'src/networkPackets/fromServer/initLevel';
import { LevelLoaderService } from 'src/gameData/gameServices/level-loader.service';
import { PacketSpawnPlayer } from 'src/networkPackets/fromServer/spawnPlayer';

export class NetworkPacketSerializer {
  static spawnEntity(ent: Entity): [ServerPackets, PacketSpawnEntity] {
    let packetType = ServerPackets.SPAWN_ENTITY;
    const packet: PacketSpawnEntity = {
      entityName: ent.entityName,
      faction: ent.faction,
      networkId: ent.networkId,
      position: ent.gameObject.body.position,
    };

    if (ent instanceof CharacterEntity) {
      packetType = ServerPackets.SPAWN_ENTITY_CHARACTER;

      const packetCharacter = packet as PacketSpawnEntityCharacter;

      packetCharacter.health = ent.health;
      packetCharacter.maxHealth = ent.maxHealth;
      packetCharacter.speed = ent.speed;
      packetCharacter.level = ent.level;
    }

    if (ent instanceof HumanoidEntity) {
      packetType = ServerPackets.SPAWN_ENTITY_HUMANOID;

      const packetHumanoid = packet as PacketSpawnEntityHumanoid;

      packetHumanoid.armor = ent.armor;
    }

    return [packetType, packet];
  }

  static spawnPlayer(ent: HumanoidEntity): [ServerPackets, PacketSpawnPlayer] {
    return this.spawnEntity(ent) as [ServerPackets, PacketSpawnPlayer];
  }

  static initLevel(levelScene: LevelScene): PacketInitLevel {
    return {
      locationName: levelScene.levelName,
      levelData: LevelLoaderService.exportLevel(levelScene),
    };
  }
}
