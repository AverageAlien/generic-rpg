import { Faction } from "../../core/factions";
import { Armor } from "../gameplay/items/armor";
import { ArmorType } from "../gameplay/items/itemEnums";
import { Weapon } from "../gameplay/items/weapon";

export interface SpawnWarriorConfig {
  name?: string;
  level?: number;
  maxHealth?: number;
  speed?: number;
  faction?: Faction;

  sightRange?: number;

  weapon?: Weapon;
  armor?: Armor[];
}