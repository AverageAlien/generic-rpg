import { Injectable } from '@angular/core';
import { Level } from '../scenes/levelScene';
import { LevelSerialization } from '../models/levelSerialization.model';
import { BlockIds } from '../core/blocks';

@Injectable({
  providedIn: 'root'
})
export class LevelLoaderService {
  public exportLevel(level: Level): string {
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

  public importlevel(levelJson: string, level: Level): void {
    const minLevel: LevelSerialization.MinifiedLevel = JSON.parse(levelJson);

    for (const layer of minLevel.l) {
      for (const block of layer[1]) {
        level.mapGrid.addBlock(new Phaser.Math.Vector2(block[0], block[1]), BlockIds[block[2]], layer[0]);
      }
    }

    console.log(level.mapGrid);
  }
}
