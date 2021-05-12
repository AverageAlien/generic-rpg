import { LevelScene } from 'src/app/core/levelScene';
import { DamageNumberEffect } from './damageNumber';
import { WeaponSwingEffect } from './weaponSwing';

export class EffectsSystem {
  public static InitializeEffects(levelScene: LevelScene) {
    WeaponSwingEffect.InitLevelScene(levelScene);
    DamageNumberEffect.InitLevelScene(levelScene);
  }
}
