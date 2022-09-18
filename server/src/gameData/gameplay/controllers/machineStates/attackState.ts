import { SituationContext } from '../machineInfrastructure/situationContext.model';
import { BaseState } from './baseState';
import { IdleState } from './idleState';
import { NavigateToTargetState } from './navigateToTargetState';

export class AttackState extends BaseState {
  public movement(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.controller.target.pos)
      .subtract(this.myself.pos)
      .normalize();
  }

  public attack(): Phaser.Math.Vector2 {
    if (this.controller.target.pos.distanceSq(this.myself.pos)
      < 48 + this.myself.getEquipment().weapon.reach ** 2) {
      return new Phaser.Math.Vector2(this.controller.target.pos);
    }
  }

  public transitionState(ctx: SituationContext) {
    if (!ctx.target?.entity?.gameObject?.body) {
      return new IdleState(this.myself, this.controller, this.levelScene, this.sightRange);
    }

    if (ctx.target.distanceSq > this.unrushDistanceSq) {
      return new NavigateToTargetState(this.myself, this.controller, this.levelScene, this.sightRange);
    }

    return null;
  }
}