import { Vector } from './geometryObjects';
import { Collider } from './physicsObjects';
import { DrawableObject } from './drawableObjects';
import { Controller } from './controllerObjects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class GameObject {
  constructor(public position: Vector, public collider: Collider = null, public texture: DrawableObject = null) {}
}

export class MovingObject extends GameObject {
  public velocity: Vector = new Vector(0, 0);

  constructor(position: Vector, collider: Collider = null, texture: DrawableObject = null) {
    super(position, collider, texture);
  }
}

export class Entity extends MovingObject {
  public health: number;
  private _controller: Controller;
  private unsub$: Subject<void> = new Subject();

  constructor(public name: string, public maxHealth: number, public speed: number, public level: number, position: Vector) {
    super(position);

    this.health = maxHealth;
  }

  set controller(value: Controller) {
    if (this._controller) {
      this.unsub$.next();
    }

    this._controller = value;
    this._controller.move.pipe(takeUntil(this.unsub$)).subscribe((vector) => {
      this.velocity = vector.scale(this.speed);
    });

    this._controller.attack.pipe(takeUntil(this.unsub$)).subscribe((vector) => {
      console.log(`attacking ${vector}`);
    });
  }
}
