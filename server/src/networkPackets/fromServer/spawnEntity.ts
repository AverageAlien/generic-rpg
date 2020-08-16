import { Faction } from 'src/core/factions';
import { Armor } from 'src/gameData/gameplay/items/armor';

export interface PacketSpawnEntity {
    entityName: string;
    networkId: string;
    faction: Faction;
    position: Phaser.Math.Vector2;
}

export interface PacketSpawnEntityCharacter extends PacketSpawnEntity {
    maxHealth: number;
    health: number;
    level: number;
    speed: number;
}

export interface PacketSpawnEntityHumanoid extends PacketSpawnEntityCharacter {
    armor: Armor;
}