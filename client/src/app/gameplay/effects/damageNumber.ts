import { BaseEffect } from './baseEffect';

const damageRange = [10, 10000];
const magnitudeRange = damageRange.map(d => Math.log10(d));
const fontRange = [18, 28];
const durationRange = [1500, 5000];

export class DamageNumberEffect extends BaseEffect {
  constructor(
    damage: number,
    x: number,
    y: number,
    color = 'red'
  ) {
    super();
    if (!DamageNumberEffect.levelScene) {
      throw new Error('Level scene not initialized for WeaponSwingEffect');
    }

    const evaluation = this.evaluateDamage(damage);

    const label = DamageNumberEffect.levelScene.add.text(x, y, '' + (Math.abs(damage)), {
      fontFamily: 'fantasy',
      fontSize: `${evaluation.fontSize}px`,
      fontWeight: '100',
      color
    }).setDepth(10)
    .setOrigin(0.5, 0.5);

    DamageNumberEffect.levelScene.tweens.add({
      targets: label,
      y: {
        from: y,
        to: y - 50,
        duration: evaluation.duration,
        ease: 'Quart.easeOut'
      },
      alpha: {
        from: 1,
        to: 0,
        ease: 'Quart.easeIn',
        duration: evaluation.duration
      },
      onComplete: () => label.destroy()
    });
  }

  private evaluateDamage(dmg: number) {
    const clampedDmg = Math.max(Math.min(dmg, damageRange[1]), damageRange[0]);
    const magnitude = Math.log10(clampedDmg);
    const normalizedMagnitude = (magnitude - magnitudeRange[0]) / (magnitudeRange[1] - magnitudeRange[0]);

    const fontSize = Math.round(fontRange[0] + normalizedMagnitude * (fontRange[1] - fontRange[0]));
    const duration = durationRange[0] + normalizedMagnitude * (durationRange[1] - durationRange[0]);

    return {
      fontSize,
      duration
    };
  }
}
