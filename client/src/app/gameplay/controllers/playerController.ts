import { Controller } from './baseController';
import { InputKeys } from 'src/app/models/inputKeys.model';
import { NetworkingService } from 'src/app/services/networking.service';

export class PlayerController implements Controller {
  private previousMovement: Phaser.Math.Vector2;

  constructor(private inputKeys: InputKeys, private networkingService: NetworkingService) {}

  get movement(): Phaser.Math.Vector2 {
    const movementVector = new Phaser.Math.Vector2(
      -this.inputKeys.left.isDown || +this.inputKeys.right.isDown,
      -this.inputKeys.up.isDown || +this.inputKeys.down.isDown).normalize();

    if (!this.previousMovement || !movementVector.equals(this.previousMovement)) {
      console.log('Movement changed!');
      this.previousMovement = movementVector;
    }
    return new Phaser.Math.Vector2(movementVector);
  }

  get attack(): Phaser.Math.Vector2 {
    return null;
  }
}
