import { LevelScene } from 'src/app/core/levelScene';

export class BaseEffect {
  protected static levelScene: LevelScene;

  public static InitLevelScene(level: LevelScene) {
    this.levelScene = level;
  }
}
