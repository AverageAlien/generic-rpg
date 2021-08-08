import { GameObjects } from 'phaser';
import { Weapon } from '../items/weapon';
import { BaseEffect } from './baseEffect';

export class WeaponSwingEffect extends BaseEffect {
  constructor(
    weapon: Weapon,
    x: number,
    y: number,
    angle: number,
    attachTo?: GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }) {
      super();
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
        .setOrigin(0.5, 1)
        .setAngle(angle - weapon.swing * 0.5);

      const animation = WeaponSwingEffect.levelScene.tweens.add({
        targets: sprite,
        angle: {
          from: angle - weapon.swing * 0.5,
          to: angle + weapon.swing * 0.5
        },
        ease: 'Sine.easeOut',
        duration: 333,
        onComplete: () => sprite.destroy(),
        onUpdate: !attachTo ? null : () => sprite.setPosition(attachTo.body.center.x, attachTo.body.center.y),
      });

      attachTo.on('destroy', gameObject => {
        console.log('DESTROY EVENT');
        console.log(gameObject);

        animation.stop();
        sprite.destroy();
      });
  }
}
