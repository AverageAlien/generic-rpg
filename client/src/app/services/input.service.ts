import { Injectable } from '@angular/core';
import { Vector } from '../core/geometryObjects';
import { PlayerController } from '../core/controllerObjects';
import { MoveKeysState } from '../models/moveKeysState.model';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  controller: PlayerController;
  moveKeysState: MoveKeysState;

  public init() {
    this.controller = new PlayerController();

    this.moveKeysState = {
      up: false,
      down: false,
      left: false,
      right: false
    };
  }

  public moveUp(input: boolean): void {
    this.moveKeysState.up = input;
    this.sendMovement();
  }

  public moveDown(input: boolean): void {
    this.moveKeysState.down = input;
    this.sendMovement();
  }

  public moveLeft(input: boolean): void {
    this.moveKeysState.left = input;
    this.sendMovement();
  }

  public moveRight(input: boolean): void {
    this.moveKeysState.right = input;
    this.sendMovement();
  }

  public Attack(input: Vector): void {
    this.controller.attack$.next(input);
  }

  private sendMovement() {
    const movementVector = new Vector(
      +this.moveKeysState.right - +this.moveKeysState.left,
      +this.moveKeysState.up - +this.moveKeysState.down);
    this.controller.move$.next(movementVector.Unit);
  }
}
