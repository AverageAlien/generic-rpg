import { LevelScene } from '../../../../core/levelScene';
import { HumanoidEntity } from '../../entities/humanoidEntity';
import { StateMachineController } from '../stateMachineController';

export abstract class BaseState {
  constructor(
    protected myself: HumanoidEntity,
    protected controller: StateMachineController,
    protected levelScene: LevelScene,
    protected sightRange: () => number
  ) {}

  public abstract movement(): Phaser.Math.Vector2;
  public abstract attack(): Phaser.Math.Vector2;
}