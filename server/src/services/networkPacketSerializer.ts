import { Entity } from '../gameData/gameplay/entities/baseEntity';
import { ServerPackets } from '../networkPackets/fromServer/serverPackets';
import {
  PacketSpawnEntity,
  PacketSpawnEntityHumanoid,
  PacketSpawnEntityCharacter,
} from '../networkPackets/fromServer/spawnEntity';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { CharacterEntity } from '../gameData/gameplay/entities/characterEntity';
import { LevelScene } from '../core/levelScene';
import { PacketInitLevel } from '../networkPackets/fromServer/initLevel';
import { LevelLoaderService } from '../gameData/gameServices/level-loader.service';
import { PacketSpawnPlayer } from '../networkPackets/fromServer/spawnPlayer';

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
