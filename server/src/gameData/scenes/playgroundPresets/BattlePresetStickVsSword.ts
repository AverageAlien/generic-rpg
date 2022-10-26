import { Faction } from '../../../core/factions';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity';
import { ArmorPresets } from '../../itemPresets/armorPresets';
import { BaseBattlePreset } from './BaseBattlePreset';

export class BattlePresetStickVsSword extends BaseBattlePreset {
  generateEntities(): HumanoidEntity[] {
    const guyOne = this.entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(-5, 0)), {
      name: 'Warrior A',
      level: 45,
      faction: Faction.TeamA,
      maxHealth: this.randomizeMaxHealth(),
      weapon: this.randomizeSword(),
      sightRange: 1024,
      speed: this.randomizeSpeed()
    });

    const guyTwo = this.entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(5, 0)), {
      name: 'Warrior B',
      level: 22,
      faction: Faction.TeamB,
      maxHealth: this.randomizeMaxHealth(),
      weapon: this.randomizeStick(),
      armor: [ ArmorPresets.helmets.steelBowl(), ArmorPresets.boots.leatherBoots() ],
      speed: this.randomizeSpeed()
    });

    return [guyOne, guyTwo];
  }
}