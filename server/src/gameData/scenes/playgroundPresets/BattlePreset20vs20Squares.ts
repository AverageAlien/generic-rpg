import { Faction } from '../../../core/factions';
import { NetworkEntitySpawner } from '../../../services/networkEntitySpawner';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity';
import { WeaponPresets } from '../../itemPresets/weaponPresets';
import { BaseBattlePreset } from './BaseBattlePreset';

export class BattlePreset20vs20Squares extends BaseBattlePreset {
  generateEntities(entitySpawner: NetworkEntitySpawner): HumanoidEntity[] {
    const teamA = [];
    const teamB = [];

    // team A
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 5; ++j) {
        teamA.push(entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(-5 - i, 3 * (Math.floor(j / 2) - 2))),
        {
          name: `Warrior Left`,
          level: Math.ceil(Math.random() * 50),
          faction: Faction.TeamA,
          maxHealth: 100 + Math.floor(Math.random() * 50),
          weapon: Math.random() > 0.7 ? WeaponPresets.shortSword() : WeaponPresets.woodenStick(),
          armor: this.randomizeArmor(),
          sightRange: 1024
        }));
      }
    }

    // team B
    for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 5; ++j) {
        teamB.push(entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(5 + i, 3 * (j - 2))),
        {
          name: `Warrior Right`,
          level: Math.ceil(Math.random() * 50),
          faction: Faction.TeamB,
          maxHealth: 100 + Math.floor(Math.random() * 50),
          weapon: Math.random() > 0.7 ? WeaponPresets.shortSword() : WeaponPresets.woodenStick(),
          armor: this.randomizeArmor(),
          sightRange: 1024
        }));
      }
    }

    return [...teamA, ...teamB];
  }
}