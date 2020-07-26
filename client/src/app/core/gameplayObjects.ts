import { Vector } from './geometryObjects';
import { Collider } from './physicsObjects';
import { DrawableObject } from './drawableObjects';

export class GameObject {
  constructor(public position: Vector, public collider: Collider = null, public texture: DrawableObject = null) {}
}

export class MovingObject extends GameObject {
  public Velocity: Vector;

  constructor(position: Vector, collider: Collider = null, texture: DrawableObject = null) {
    super(position, collider, texture);
  }
}

export class Entity extends MovingObject {

}
