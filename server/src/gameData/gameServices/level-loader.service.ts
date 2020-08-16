import { LevelSerialization } from '../models/levelSerialization.model';
import { LevelScene } from '../../core/levelScene';
import { BlockIds } from '../../core/blocks';

export class LevelLoaderService {
  public static exportLevel(level: LevelScene): string {
    const minLevel: LevelSerialization.MinifiedLevel = {
      l: []
    };

    for (const layer of level.mapGrid.getUsedLayers()) {
      minLevel.l.push([
        layer,
        level.mapGrid.getAllOfLayer(layer).map(b => [b.x, b.y, BlockIds.indexOf(b.name)])
      ]);
    }

    return JSON.stringify(minLevel);
  }

  public static importlevel(levelJson: string, level: LevelScene): void {
    const minLevel: LevelSerialization.MinifiedLevel = JSON.parse(levelJson);

    for (const layer of minLevel.l) {
      for (const block of layer[1]) {
        level.mapGrid.addBlock(new Phaser.Math.Vector2(block[0], block[1]), BlockIds[block[2]], layer[0]);
      }
    }
  }
}
