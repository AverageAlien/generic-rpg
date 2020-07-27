import { Observable, Subject } from 'rxjs';
import { Vector, Line } from './geometryObjects';
import { GameObject, MovingObject } from './gameplayObjects';

export interface Collider {
  collided: Observable<Collider>;
  frozen: boolean; // static
  solid: boolean;
  gameObject: GameObject;
  safeDistance: number; // for broad phase collision detection

  checkCollision(other: Collider): boolean;
}

export class BoxCollider implements Collider {
  private $collided = new Subject<Collider>();

  get collided() {
    return this.$collided.asObservable();
  }

  get safeDistance() {
    return this.size.sqrMagnitude + 1;
  }

  constructor(public frozen: boolean, public solid: boolean, public gameObject: GameObject, public size: Vector) {}

  public checkCollision(other: Collider): boolean {
    if (this.frozen && other.frozen) { return false; }

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

        if (this.gameObject instanceof MovingObject) {

          let horizontalWall: Line;
          let verticalWall: Line;

          const sumSize = other.size.add(this.size).scale(0.5);

          if (this.gameObject.velocity.X > 0) {
            verticalWall = new Line(
              other.gameObject.position.sub(sumSize),
              other.gameObject.position.sub(sumSize.flipY())
            );
          } else {
            verticalWall = new Line(
              other.gameObject.position.add(sumSize),
              other.gameObject.position.add(sumSize.flipY())
            );
          }

          if (this.gameObject.velocity.Y > 0) {
            horizontalWall = new Line(
              other.gameObject.position.sub(sumSize),
              other.gameObject.position.sub(sumSize.flipX())
            );
          } else {
            horizontalWall = new Line(
              other.gameObject.position.add(sumSize),
              other.gameObject.position.add(sumSize.flipX())
            );
          }

          const movementPath = new Line(this.gameObject.position, this.gameObject.position.sub(this.gameObject.velocity));

          const intersects = [
            movementPath.intersect(verticalWall),
            movementPath.intersect(horizontalWall)
          ];

          const collisionOffset = Math.min(...intersects.map(v => this.gameObject.position.sub(v).Magnitude).filter(d => d !== Infinity));

          console.log(collisionOffset);

          if (collisionOffset === Infinity) {
            debugger;
          }

          this.gameObject.position = this.gameObject.position.add(this.gameObject.velocity.Unit.scale(-collisionOffset));
        }

        return true;
      }
    }
  }
}
