import { HumanoidEntity } from '../../entities/humanoidEntity';
import { SituationContext } from '../machineInfrastructure/situationContext.model';
import { StateMachineController } from '../stateMachineController';
import { AttackState } from './attackState';
import { BaseState } from './baseState';
import { IdleState } from './idleState';
import { NavigateToTargetState } from './navigateToTargetState';

export class RetreatState extends BaseState {
  

  public movement(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.controller.target.pos)
      .subtract(this.myself.pos)
      .scale(-1)
      .normalize();
  }

  public attack(): Phaser.Math.Vector2 {
    return null;
  }

  public transitionState(ctx: SituationContext): BaseState {
    if (this.isNoTarget(ctx)) {
      return new IdleState(this.myself, this.controller, this.levelScene, this.sightRange);
    }

    if (!this.shouldRetreat(ctx)) {
      return ctx.target.distanceSq < this.rushDistanceSq
        ? new AttackState(this.myself, this.controller, this.levelScene, this.sightRange)
        : new NavigateToTargetState(this.myself, this.controller, this.levelScene, this.sightRange);
    }

    return null;
  }
}