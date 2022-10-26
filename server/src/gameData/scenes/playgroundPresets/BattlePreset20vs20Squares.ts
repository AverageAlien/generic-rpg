import { Faction } from '../../../core/factions';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity';
import { BaseBattlePreset } from './BaseBattlePreset';

export class BattlePreset20vs20Squares extends BaseBattlePreset {
  generateEntities(): HumanoidEntity[] {
    const teamA = [];
    const teamB = [];

    // team A
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 5; ++j) {
        teamA.push(this.entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(-5 - i, 3 * (Math.floor(j / 2) - 2))),
        {
          name: `Warrior Left`,
          level: Math.ceil(Math.random() * 50),
          faction: Faction.TeamA,
          maxHealth: this.randomizeMaxHealth(),
          weapon: Math.random() > 0.5 ? this.randomizeSword() : this.randomizeStick(),
          armor: this.randomizeArmor(),
          sightRange: 1024,
          speed: this.randomizeSpeed()
        }));
      }
    }

    // team B
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 5; ++j) {
        teamB.push(this.entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(5 + i, 3 * (j - 2))),
        {
          name: `Warrior Right`,
          level: Math.ceil(Math.random() * 50),
          faction: Faction.TeamB,
          maxHealth: this.randomizeMaxHealth(),
          weapon: Math.random() > 0.5 ? this.randomizeSword() : this.randomizeStick(),
          armor: this.randomizeArmor(),
          sightRange: 1024,
          speed: this.randomizeSpeed()
        }));
      }
    }

    return [...teamA, ...teamB];
  }
}