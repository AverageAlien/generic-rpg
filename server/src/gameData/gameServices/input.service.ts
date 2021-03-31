import { InputKeys } from '../models/inputKeys.model';


export class InputService {
  private inputs = {
    up: 'W',
    down: 'S',
    left: 'A',
    right: 'D'
  };

  public getInputKeys(keyboard: Phaser.Input.Keyboard.KeyboardPlugin): InputKeys {
    return {
      up: keyboard.addKey(this.inputs.up),
      down: keyboard.addKey(this.inputs.down),
      left: keyboard.addKey(this.inputs.left),
      right: keyboard.addKey(this.inputs.right),
    };
  }
}
