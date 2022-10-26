import { Faction } from '../../../core/factions';
import { NetworkEntitySpawner } from '../../../services/networkEntitySpawner';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity'
import { AIControllerFactory } from '../controllerFactories/aiControllerFactory';
import { BaseBattlePreset } from './BaseBattlePreset';

export class BattlePresetControllersComptetition extends BaseBattlePreset {
  constructor(private numOfWarriorsInTeam: number,
    entitySpawner: NetworkEntitySpawner,
    private teamAControllerFactory: AIControllerFactory,
    private teamBControllerFactory: AIControllerFactory) {
    super(entitySpawner);
  }

  generateEntities(): HumanoidEntity[] {
    const entities = [];

    for (let i = 0; i < this.numOfWarriorsInTeam * 2; ++i) {
      const even = i % 2 === 0;
      const team = even ? Faction.TeamA : Faction.TeamB;
      const controllerFactory = even ? this.teamAControllerFactory : this.teamBControllerFactory;
      entities.push(this.entitySpawner.spawnWarrior(this.addPositionOffset(new Phaser.Math.Vector2(
        even ? -5 : 5,
        3 * (Math.floor(i / 2) - 2))),
      {
        name: `Warrior ${i} (${ controllerFactory.controllerName })`,
        level: Math.ceil(Math.random() * 50),
        faction: team,
        maxHealth: this.randomizeMaxHealth(),
        weapon: Math.random() > 0.5 ? this.randomizeSword() : this.randomizeStick(),
        armor: this.randomizeArmor(),
        sightRange: 1024,
        speed: this.randomizeSpeed()
      }, controllerFactory));
    }

    return entities;
  }
}