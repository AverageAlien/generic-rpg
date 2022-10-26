import { Faction } from '../../../core/factions';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity'
import { BaseBattlePreset } from './BaseBattlePreset';

export class BattlePreset5Baddies extends BaseBattlePreset {
  generateEntities(): HumanoidEntity[] {
    const entities = [];

    for (let i = 0; i < 5; ++i) {
      entities.push(this.entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(10, 3 * i - 2)),
      {
        name: `Angry warrior`,
        level: Math.ceil(Math.random() * 50),
        faction: Faction.Baddies,
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