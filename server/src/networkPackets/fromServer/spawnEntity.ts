import { Faction } from '../../core/factions';
import { Armor } from '../../gameData/gameplay/items/armor';
import { Weapon } from '../../gameData/gameplay/items/weapon';

export interface PacketSpawnEntity {
    entityName: string;
    networkId: string;
    faction: Faction;
    positionX: number;
    positionY: number;
}

export interface PacketSpawnEntityCharacter extends PacketSpawnEntity {
    maxHealth: number;
    health: number;
    level: number;
    speed: number;
}

export interface PacketSpawnEntityHumanoid extends PacketSpawnEntityCharacter {
    helmet: Armor;
    bodyArmor: Armor;
    boots: Armor;
    weapon: Weapon;
}