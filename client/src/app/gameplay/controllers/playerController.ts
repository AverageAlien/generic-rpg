import { Controller } from './baseController';
import { InputKeys } from 'src/app/models/inputKeys.model';
import { BehaviorSubject } from 'rxjs';
import { LevelScene } from 'src/app/core/levelScene';

export class PlayerController implements Controller {
  private movementChanged$ = new BehaviorSubject<Phaser.Math.Vector2>(Phaser.Math.Vector2.ZERO);

  constructor(private inputKeys: InputKeys, private levelScene: LevelScene) {}

  get movement(): Phaser.Math.Vector2 {
    const movementVector = new Phaser.Math.Vector2(
      -this.inputKeys.left.isDown || +this.inputKeys.right.isDown,
      -this.inputKeys.up.isDown || +this.inputKeys.down.isDown).normalize();

    if (!movementVector.equals(this.movementChanged$.value)) {
      this.movementChanged$.next(movementVector);
    }
    return new Phaser.Math.Vector2(movementVector);
  }

  get movementChanged() {
    return this.movementChanged$.asObservable();
  }

  get attack(): Phaser.Math.Vector2 {
    return this.levelScene.input.activePointer.primaryDown
    ? this.levelScene.input.activePointer.positionToCamera(this.levelScene.cameras.main) as Phaser.Math.Vector2
    : null;
  }
}
