import { Injectable } from '@angular/core';
import { GameObject, MovingObject } from '../core/gameplayObjects';
import { Line } from '../core/geometryObjects';

@Injectable({
  providedIn: 'root'
})
export class PhysicsService {
  private lastUpdateTime = performance.now();

  public update(objects: GameObject[]) {
    const now = performance.now();
    const deltaTime = now - this.lastUpdateTime;
    this.lastUpdateTime = now;

    objects.forEach(obj => {
      if (obj instanceof MovingObject) {
        obj.position = obj.position.add(obj.velocity.scale(deltaTime * 0.001));
      }
    });

    objects.filter(obj => obj.collider).forEach((obj, i) => {
      objects
        .filter(o => o.position.sub(obj.position).sqrMagnitude < Math.max(o.collider.safeDistance, obj.collider.safeDistance))
        .forEach((o, j) => {
          if (i === j) { return; }
          if (obj.collider.checkCollision(o.collider)) {
            console.log('yep!');
          }
        });
    });
  }
}
