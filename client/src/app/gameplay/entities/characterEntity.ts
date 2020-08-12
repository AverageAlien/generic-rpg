import { Entity, Controllable, Destroyable } from './baseEntity';
import { GameObjects } from 'phaser';
import { Subject, Observable } from 'rxjs';
import { Controller } from '../controllers/baseController';
import { Constants } from 'src/app/core/constants';
import { Faction } from 'src/app/core/factions';


export class CharacterEntity implements Entity, Controllable, Destroyable {
  public health: number;
  public controller: Controller;
  public faction: Faction = Faction.Player;
  protected destroyed$ = new Subject<void>();

  constructor(
    public name: string,
    public gameObject: GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body },
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

  damage(dmg: number): void {
    this.health -= dmg;

    if (this.health <= 0) {
      this.destroy();
    }
  }

  destroy(): void {
    this.gameObject.destroy();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  protected move() {
    const maxSpeedMult = Constants.Character.MAX_SPEED_MULT;
    const movement = this.controller.movement.scale(this.speed * maxSpeedMult * 10);
    if (this.gameObject.body.velocity.lengthSq() > (this.speed * this.speed * maxSpeedMult * maxSpeedMult)) {
      this.gameObject.body.velocity.normalize().scale(this.speed * maxSpeedMult);
    }
    if (movement.x !== 0) {
      this.lookRight(movement.x > 0);
    }
    this.gameObject.body.setAcceleration(movement.x, movement.y);
  }

  protected lookRight(condition: boolean) {
    this.gameObject.setFlipX(condition);
  }
}
