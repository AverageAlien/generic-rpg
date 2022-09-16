import { Controller } from './baseController';

export class StateMachineController implements Controller {
  movement: Phaser.Math.Vector2;
  attack: Phaser.Math.Vector2;
}