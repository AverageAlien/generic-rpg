import { Faction } from '../../../core/factions';
import { NetworkEntitySpawner } from '../../../services/networkEntitySpawner';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity'
import { WeaponPresets } from '../../itemPresets/weaponPresets';
import { BaseBattlePreset } from './BaseBattlePreset';

export class BattlePreset5Baddies extends BaseBattlePreset {
  generateEntities(entitySpawner: NetworkEntitySpawner): HumanoidEntity[] {
    const entities = [];

    for (let i = 0; i < 5; ++i) {
      entities.push(entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(10, 3 * i - 2)),
      {
        name: `Angry warrior`,
        level: Math.ceil(Math.random() * 50),
        faction: Faction.Baddies,
        maxHealth: 100 + Math.floor(Math.random() * 50),
        weapon: Math.random() > 0.7 ? WeaponPresets.shortSword() : WeaponPresets.woodenStick(),
        armor: this.randomizeArmor(),
        sightRange: 1024
      }));
    }

    return entities;
  }
}