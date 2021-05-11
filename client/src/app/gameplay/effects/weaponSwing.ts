import { GameObjects } from 'phaser';
import { LevelScene } from 'src/app/core/levelScene';
import { Weapon } from '../items/weapon';

export class WeaponSwingEffect {
  private static levelScene: LevelScene;

  static initLevelScene(level: LevelScene) {
    this.levelScene = level;
  }

  constructor(
    weapon: Weapon,
    x: number,
    y: number,
    angle: number,
    attachTo?: GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }) {
    if (!WeaponSwingEffect.levelScene) {
      throw new Error('Level scene not initialized for WeaponSwingEffect');
    }

    const textureName = weapon.texture + '_icon';
    const texture = WeaponSwingEffect.levelScene.textures.getFrame(textureName);
    const length = weapon.reach / texture.height;

    const sprite = WeaponSwingEffect.levelScene.add.sprite(
      x,
      y,
      textureName
    ).setDepth(4)
    .setScale(length * 0.75, length)
    .setOrigin(0.5, 1);

    WeaponSwingEffect.levelScene.tweens.add({
      targets: sprite,
      angle: {
        from: angle - weapon.swing * 0.5,
        to: angle + weapon.swing * 0.5
      },
      duration: 333,
      onComplete: () => sprite.destroy(),
      onUpdate: !attachTo ? null : () => sprite.setPosition(attachTo.body.center.x, attachTo.body.center.y),
    });
  }
}
