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

  public init(controller: PlayerController) {
    this.controller = controller;

    this.moveKeysState = {
      vert: 0,
      hor: 0
    };
  }

  public moveUp(input: boolean): void {
    this.moveKeysState.vert = +input;
    this.sendMovement();
  }

  public moveDown(input: boolean): void {
    this.moveKeysState.vert = -input;
    this.sendMovement();
  }

  public moveLeft(input: boolean): void {
    this.moveKeysState.hor = -input;
    this.sendMovement();
  }

  public moveRight(input: boolean): void {
    this.moveKeysState.hor = +input;
    this.sendMovement();
  }

  public Attack(input: Vector): void {
    this.controller.$attack.next(input);
  }

  private sendMovement() {
    this.controller.$move.next(new Vector(this.moveKeysState.hor, this.moveKeysState.vert).Unit);
  }
}
