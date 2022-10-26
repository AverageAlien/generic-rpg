import { Faction } from '../../../core/factions';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity';
import { Weapon } from '../../gameplay/items/weapon';
import { BaseBattlePreset } from './BaseBattlePreset';

export class BattlePreset4v4v4 extends BaseBattlePreset {
  generateEntities(): HumanoidEntity[] {
    const teamA = this.makeTeamOfWarriors(-5, -5, 'Warrior A', Faction.TeamA);
    const teamB = this.makeTeamOfWarriors(5, -5, 'Warrior B', Faction.TeamB);
    const teamC = this.makeTeamOfWarriors(0, 7, 'Warrior C', Faction.TeamC);

    return [...teamA, ...teamB, ...teamC];
  }

  private getWeapon(): Weapon {
    return Math.random() > 0.5 ? this.randomizeSword() : this.randomizeStick();
  }

  private makeTeamOfWarriors(x: number, y: number, name: string, team: Faction): HumanoidEntity[] {
    const warriors = [];

    for (let i = 0; i < 4; ++i) {
      warriors.push(this.entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(x, y)),
      {
        name,
        level: Math.ceil(Math.random() * 50),
        faction: team,
        maxHealth: this.randomizeMaxHealth(),
        weapon: this.getWeapon(),
        armor: this.randomizeArmor(),
        sightRange: 1024,
        speed: this.randomizeSpeed()
      }));
    }

    return warriors;
  }
}