import { Observable, Subject } from 'rxjs';
import { Vector } from './geometryObjects';
import { GameObject } from './gameplayObjects';

export interface Collider {
  collided: Observable<Collider>;
  frozen: boolean; // static
  solid: boolean;
  gameObject: GameObject;

  checkCollision(other: Collider): boolean;
}

export class BoxCollider implements Collider {
  private $collided = new Subject<Collider>();

  get collided() {
    return this.$collided.asObservable();
  }

  constructor(public frozen: boolean, public solid: boolean, public gameObject: GameObject, public size: Vector) {}

  public checkCollision(other: Collider): boolean {
    const halfSize = this.size.scale(0.5);
    const myPosition = this.gameObject.position;

    if (other instanceof BoxCollider) {
      const otherHalfSize = other.size.scale(0.5);
      const otherPosition = other.gameObject.position;
      if (
        otherPosition.X - otherHalfSize.X > myPosition.X + halfSize.X ||
        myPosition.X - halfSize.X > otherPosition.X + otherHalfSize.X ||
        otherPosition.Y - otherHalfSize.Y > myPosition.Y + halfSize.Y ||
        myPosition.Y - halfSize.Y > otherPosition.Y + otherHalfSize.Y
      ) {
        return false;
      } else {
        this.$collided.next(other);
        return true;
      }
    }
  }
}
