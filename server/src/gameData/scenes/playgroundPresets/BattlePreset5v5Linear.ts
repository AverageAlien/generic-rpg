import { Faction } from '../../../core/factions';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity'
import { WeaponPresets } from '../../itemPresets/weaponPresets';
import { BaseBattlePreset } from './BaseBattlePreset';

export class BattlePreset5v5Linear extends BaseBattlePreset {
  generateEntities(): HumanoidEntity[] {
    const entities = [];

    for (let i = 0; i < 10; ++i) {
      const even = i % 2 === 0;
      const team = even ? Faction.TeamA : Faction.TeamB;
      entities.push(this.entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(
        even ? -5 : 5,
        3 * (Math.floor(i / 2) - 2))),
      {
        name: `Warrior ${i} (${team === Faction.TeamA ? 'A' : 'B'})`,
        level: Math.ceil(Math.random() * 50),
        faction: team,
        maxHealth: this.randomizeMaxHealth(),
        weapon: Math.random() > 0.5 ? this.randomizeSword() : this.randomizeStick(),
        armor: this.randomizeArmor(),
        sightRange: 1024,
        speed: this.randomizeSpeed()
      }));
    }

    return entities;
  }
}