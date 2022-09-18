import { SituationContext } from '../machineInfrastructure/situationContext.model';
import { AttackState } from './attackState';
import { BaseState } from './baseState';
import { NavigateToTargetState } from './navigateToTargetState';

export class IdleState extends BaseState {
  public movement(): Phaser.Math.Vector2 {
    return Phaser.Math.Vector2.ZERO;
  }

  public attack(): Phaser.Math.Vector2 {
    return null;
  }

  public transitionState(ctx: SituationContext): BaseState {
    if (!this.isNoTarget(ctx)) {
      return ctx.target.distanceSq < this.rushDistanceSq
        ? new AttackState(this.myself, this.controller, this.levelScene, this.sightRange)
        : new NavigateToTargetState(this.myself, this.controller, this.levelScene, this.sightRange);
    }

    return null;
  }
}