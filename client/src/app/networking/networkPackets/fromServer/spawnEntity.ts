import { Faction } from 'src/app/core/factions';
import { Armor } from 'src/app/gameplay/items/armor';

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
    weapon: string;
}
