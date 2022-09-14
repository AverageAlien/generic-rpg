import { Faction } from '../../../core/factions';
import { NetworkEntitySpawner } from '../../../services/networkEntitySpawner';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity'
import { WeaponPresets } from '../../itemPresets/weaponPresets';
import { BaseBattlePreset } from './BaseBattlePreset';

export class BattlePreset5v5Linear extends BaseBattlePreset {
  generateEntities(entitySpawner: NetworkEntitySpawner): HumanoidEntity[] {
    const entities = [];

    for (let i = 0; i < 10; ++i) {
      const even = i % 2 === 0;
      const team = even ? Faction.TeamA : Faction.TeamB;
      entities.push(entitySpawner.spawnWarrior(new Phaser.Math.Vector2(
        even ? -5 : 5,
        3 * (Math.floor(i / 2) - 2)),
      {
        name: `Warrior ${i} (${team === Faction.TeamA ? 'A' : 'B'})`,
        level: Math.ceil(Math.random() * 50),
        faction: team,
        maxHealth: even ? 150 : 120,
        weapon: Math.random() > 0.7 ? WeaponPresets.shortSword() : WeaponPresets.woodenStick(),
        armor: this.randomizeArmor(),
        sightRange: 1024
      }));
    }

    return entities;
  }
}