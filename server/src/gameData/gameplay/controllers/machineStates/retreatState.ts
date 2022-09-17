import { BaseState } from "./baseState";

export class RetreatState extends BaseState {
  public movement(): Phaser.Math.Vector2 {
    throw new Error("Method not implemented.");
  }
  public attack(): Phaser.Math.Vector2 {
    throw new Error("Method not implemented.");
  }

}