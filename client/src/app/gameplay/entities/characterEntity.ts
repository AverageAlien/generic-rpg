import { Entity, Controllable, Destroyable } from './baseEntity';
import { GameObjects } from 'phaser';
import { Subject, Observable } from 'rxjs';
import { Controller } from '../controllers/baseController';
import { Constants } from 'src/app/core/constants';
import { Faction } from 'src/app/core/factions';


export class CharacterEntity implements Entity, Controllable, Destroyable {
  public entityName: string;
  public faction: Faction = Faction.Player;
  public networkId: string;

  public gameObject: GameObjects.RenderTexture & { body: Phaser.Physics.Arcade.Body };
  protected bodyTexture: string;

  public maxHealth: number;
  public health: number;
  public level: number;
  public speed: number;

  public controller: Controller;
  protected destroyed$ = new Subject<void>();

  constructor(cfg: CharacterConfig) {
    this.entityName = cfg.name;
    this.gameObject = cfg.gameObject;
    this.bodyTexture = cfg.bodyTexture;
    this.maxHealth = cfg.maxHealth || 100;
    this.health = this.maxHealth;
    this.level = cfg.level || 1;
    this.speed = cfg.speed || 20;

    this.refreshRenderSprite();
  }

  get destroyed(): Observable<void> {
    return this.destroyed$.asObservable();
  }

  update() {
    this.move();

    this.attack();
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

  protected attack() {
    const attack = this.controller.attack;

    if (!attack) {
      return;
    }

    const attackAngle = 90 + Phaser.Math.RadToDeg(
      Phaser.Math.Angle.BetweenPoints(this.gameObject.body.center, attack));

    console.log(`Attacking: ${attackAngle}`);
  }

  protected lookRight(condition: boolean) {
    this.gameObject.setFlipX(condition);
  }

  protected refreshRenderSprite() {
    this.gameObject.clear();
    this.gameObject.draw(
      this.bodyTexture,
      0, 0
    );
  }
}

export interface CharacterConfig {
  name: string;
  gameObject: Phaser.GameObjects.RenderTexture & { body: Phaser.Physics.Arcade.Body };
  bodyTexture: string;
  maxHealth?: number;
  level?: number;
  speed?: number;
}
