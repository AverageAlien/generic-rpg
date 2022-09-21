import { Faction } from '../../../core/factions';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity';
import { ArmorPresets } from '../../itemPresets/armorPresets';
import { WeaponPresets } from '../../itemPresets/weaponPresets';
import { BaseBattlePreset } from './BaseBattlePreset';

export class BattlePresetStickVsSword extends BaseBattlePreset {
  generateEntities(): HumanoidEntity[] {
    const guyOne = this.entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(-5, 0)), {
      name: 'Warrior A',
      level: 45,
      faction: Faction.TeamA,
      maxHealth: 150,
      weapon: WeaponPresets.shortSword(),
      sightRange: 1024
    });

    const guyTwo = this.entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(5, 0)), {
      name: 'Warrior B',
      level: 22,
      faction: Faction.TeamB,
      maxHealth: 120,
      weapon: WeaponPresets.woodenStick(),
      armor: [ ArmorPresets.helmets.steelBowl(), ArmorPresets.boots.leatherBoots() ]
    });

    return [guyOne, guyTwo];
  }
}