import { SituationContext } from '../machineInfrastructure/situationContext.model';
import { BaseState } from './baseState';
import { IdleState } from './idleState';
import { NavigateToTargetState } from './navigateToTargetState';
import { RetreatState } from './retreatState';

export class AttackState extends BaseState {
  public movement(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.controller.target.pos)
      .subtract(this.myself.pos)
      .normalize();
  }

  public attack(): Phaser.Math.Vector2 {
    if (!!this.controller.target?.gameObject?.body
      && this.controller.target.pos.distanceSq(this.myself.pos) < 48 + this.myself.getEquipment().weapon.reach ** 2) {
      return new Phaser.Math.Vector2(this.controller.target.pos);
    }
  }

  public transitionState(ctx: SituationContext) {
    if (this.isNoTarget(ctx)) {
      return new IdleState(this.myself, this.controller, this.levelScene, this.sightRange);
    }

    if (this.shouldRetreat(ctx)) {
      return new RetreatState(this.myself, this.controller, this.levelScene, this.sightRange);
    }

    if (ctx.target.distanceSq > this.unrushDistanceSq) {
      return new NavigateToTargetState(this.myself, this.controller, this.levelScene, this.sightRange);
    }

    return null;
  }
}