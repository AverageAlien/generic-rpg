import { performance } from 'perf_hooks';
import { BehaviorSubject, Subject } from 'rxjs';
import { Controllable } from '../entities/baseEntity';
import { Controller } from './baseController';

export class ServerWrapperController implements Controller {
  private movementChanged$ = new BehaviorSubject<Phaser.Math.Vector2>(Phaser.Math.Vector2.ZERO);
  private attacked$ = new Subject<Phaser.Math.Vector2>();

  private readonly movementUpdateTimeout = 250; // ms
  private lastMovementUpdate = 0;

  constructor(private internalController: Controller, public controlledEntity: Controllable) {}

  get movement(): Phaser.Math.Vector2 {
    const movt = this.internalController.movement;
    const now = performance.now();

    if (now - this.lastMovementUpdate > this.movementUpdateTimeout) {
      if (movt.distanceSq(this.movementChanged$.value) > 0.001) {
        this.movementChanged$.next(movt);
      }

      this.lastMovementUpdate = now;
    }

    return movt;
  }

  get attack(): Phaser.Math.Vector2 {
    return null;
  }

  get movementChanged() {
    return this.movementChanged$.asObservable();
  }
}