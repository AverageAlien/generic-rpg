import { NetworkEntitySpawner } from '../../../services/networkEntitySpawner';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity';
import { Armor } from '../../gameplay/items/armor';
import { ArmorPresets } from '../../itemPresets/armorPresets';

export abstract class BaseBattlePreset {
  abstract generateEntities(entitySpawner: NetworkEntitySpawner): HumanoidEntity[];

  addPositionOffset = (pos: Phaser.Math.Vector2) => pos;

  protected randomizeArmor(): Armor[] {
    const armor = [];

    if (Math.random() > 0.5) {
      armor.push(ArmorPresets.boots.leatherBoots());
    }

    if (Math.random() > 0.7) {
      armor.push(ArmorPresets.helmets.steelBowl());
    }

    if (Math.random() > 0.9) {
      armor.push(ArmorPresets.chestplates.steelVest());
    }

    return armor;
  }
}