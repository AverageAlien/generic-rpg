import { Entity } from '../gameData/gameplay/entities/baseEntity';
import { ServerPackets } from '../networkPackets/fromServer/serverPackets';
import {
  PacketSpawnEntity,
  PacketSpawnEntityHumanoid,
  PacketSpawnEntityCharacter,
} from '../networkPackets/fromServer/spawnEntity';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { CharacterEntity } from '../gameData/gameplay/entities/characterEntity';
import { PacketInitLevel } from '../networkPackets/fromServer/initLevel';
import { PacketSpawnPlayer } from '../networkPackets/fromServer/spawnPlayer';
import { NetworkLevel } from '../gameData/scenes/networkLevel';
import { PacketSyncSnapshot } from '../networkPackets/fromServer/syncSnapshot';

export class NetworkPacketSerializer {
  static spawnEntity(ent: Entity): [ServerPackets, PacketSpawnEntity] {
    let packetType = ServerPackets.SPAWN_ENTITY;
    const packet: PacketSpawnEntity = {
      entityName: ent.entityName,
      faction: ent.faction,
      networkId: ent.networkId,
      positionX: ent.gameObject.body.position.x,
      positionY: ent.gameObject.body.position.y
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

      const equipment = ent.getEquipment();

      packetHumanoid.helmet = equipment.helmet;
      packetHumanoid.bodyArmor = equipment.bodyArmor;
      packetHumanoid.boots = equipment.boots;
      packetHumanoid.weapon = equipment.weapon;
    }

    return [packetType, packet];
  }

  static spawnPlayer(ent: HumanoidEntity): [ServerPackets, PacketSpawnPlayer] {
    return [ServerPackets.SPAWN_PLAYER, this.spawnEntity(ent)[1] as PacketSpawnPlayer];
  }

  static initLevel(levelScene: NetworkLevel): PacketInitLevel {
    return {
      locationName: levelScene.levelName,
      levelData: levelScene.levelLoader.exportLevel(),
    };
  }

  static syncSnapshot(levelScene: NetworkLevel): PacketSyncSnapshot {
    return {
      entities: levelScene.entities.map(e => {
        return {
          networkId: e.networkId,
          positionX: (e.gameObject as unknown as Phaser.GameObjects.Components.Transform).x,
          positionY: (e.gameObject as unknown as Phaser.GameObjects.Components.Transform).y,
          velocityX: e.gameObject.body.velocity.x,
          velocityY: e.gameObject.body.velocity.y
        };
      })
    };
  }
}
