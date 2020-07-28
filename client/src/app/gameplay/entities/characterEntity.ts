import { Entity, Controllable, Destroyable } from './baseEntity';
import { GameObjects } from 'phaser';
import { Subject, Observable } from 'rxjs';
import { Controller } from '../controllers/baseController';
import { Constants } from 'src/app/core/constants';

export class CharacterEntity implements Entity, Controllable, Destroyable {
  public health: number;
  public controller: Controller;
  private destroyed$ = new Subject<void>();

  constructor(
    public name: string,
    public gameObject: GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body },
    public maxHealth: number,
    public level: number,
    public speed: number) {
    this.health = maxHealth;
  }

  get destroyed(): Observable<void> {
    return this.destroyed$.asObservable();
  }

  update() {
    this.move();
  }

  damage(): void {
    throw new Error('Method not implemented.');
  }
  destroy(): void {
    throw new Error('Method not implemented.');
  }

  private move() {
    const maxSpeedMult = Constants.MAX_SPEED_MULT;
    const movement = this.controller.movement.scale(this.speed * maxSpeedMult * 10);
    if (this.gameObject.body.velocity.lengthSq() > (this.speed * this.speed * maxSpeedMult * maxSpeedMult)) {
      const clampedVelocity = this.gameObject.body.velocity.normalize().scale(this.speed * maxSpeedMult);
    }
    this.gameObject.body.setAcceleration(movement.x, movement.y);
  }
}
