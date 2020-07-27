import { Scene } from 'phaser';
import { InputService } from '../services/input.service';
import { InputKeys } from '../models/inputKeys.model';

export class MainScene extends Scene {
  private inputs: InputKeys;
  private box: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };

  constructor(private inputService: InputService) {
    super({key: 'main'});
  }

  create() {
    this.inputs = this.inputService.getInputKeys(this.input.keyboard);

    this.box = this.add.rectangle(400, 400, 20, 20, 0x00ff00) as any;
    this.physics.add.existing(this.box);
    this.box.body.checkCollision.up = true;
    this.box.body.checkCollision.down = true;
    this.box.body.setCollideWorldBounds(true);
    this.box.body.useDamping = true;
    this.box.body.setDrag(0.95, 0.95);
    this.box.body.mass = 100000;
  }

  preload() {
    console.log('preload called');
  }

  update() {

    if (this.inputs.right.isDown) {
      this.box.body.setVelocityX(50);
    } else if (this.inputs.left.isDown) {
      this.box.body.setVelocityX(-50);
    }
  }
}
