import { Controller } from './baseController';
import { InputKeys } from 'src/gameData/models/inputKeys.model';

export class PlayerController implements Controller {
  constructor(private inputKeys: InputKeys) {}

  get movement(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(
      -this.inputKeys.left.isDown || +this.inputKeys.right.isDown,
      -this.inputKeys.up.isDown || +this.inputKeys.down.isDown).normalize();
  }

  get attack(): Phaser.Math.Vector2 {
    return null;
  }
}
