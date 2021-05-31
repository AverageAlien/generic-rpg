import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { Armor } from '../gameData/gameplay/items/armor';
import { Item } from '../gameData/gameplay/items/baseItem';
import { Weapon } from '../gameData/gameplay/items/weapon';
import { GameClient } from './gameClient';

export interface PlayerDataSnapshot {
  speed: number;
  level: number;
  maxHealth: number;
  equipment: EquipmentSnapshot;
  inventory: Item[];
}

export interface EquipmentSnapshot {
  helmet?: Armor;
  armor?: Armor;
  boots?: Armor;
  weapon?: Weapon;
}

export function MakeUserDataSnapshot(gameClient: GameClient & { controlledEntity: HumanoidEntity }): PlayerDataSnapshot {
  const inventory = [...gameClient.inventory];
  return {
    speed: gameClient.controlledEntity.speed,
    level: gameClient.controlledEntity.level,
    maxHealth: gameClient.controlledEntity.maxHealth,
    inventory,
    equipment: MakeEquipmentSnapshot(gameClient.controlledEntity, inventory)
  }
}

function MakeEquipmentSnapshot(entity: HumanoidEntity, inventory: Item[]): EquipmentSnapshot {
  const equipment = entity.getEquipment();

  const helmet = inventory.indexOf(equipment.helmet);
  const armor = inventory.indexOf(equipment.bodyArmor);
  const boots = inventory.indexOf(equipment.boots);
  const weapon = inventory.indexOf(equipment.weapon);

  return {
    helmet: equipment.helmet,
    armor: equipment.bodyArmor,
    boots: equipment.boots,
    weapon: equipment.weapon
  };
}
