export class StaticBlock {
  constructor(public gameObject: Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.StaticBody }) {}
}
