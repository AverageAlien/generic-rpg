import { LevelScene } from '../../../../core/levelScene';
import { HumanoidEntity } from '../../entities/humanoidEntity';
import { StateMachineController } from '../stateMachineController';
import { BaseState } from './baseState';

export class IdleState extends BaseState {
  public movement(): Phaser.Math.Vector2 {
    return null;
  }
  public attack(): Phaser.Math.Vector2 {
    return null;
  }
}