import { BaseState } from './baseState';

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
}