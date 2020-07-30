import { Injectable } from '@angular/core';
import { Level } from '../scenes/levelScene';
import { LevelSerialization } from '../models/levelSerialization.model';

@Injectable({
  providedIn: 'root'
})
export class LevelLoaderService {
  public exportLevel(level: Level): string {
    const objLevel: LevelSerialization.Level = {
      layers: []
    };

    for (const layer of level.mapGrid.getUsedLayers()) {
      const objLayer: LevelSerialization.Layer = {
        layerId: layer,
        blocks: level.mapGrid.getAllOfLayerSerialized(layer)
      };

      objLevel.layers.push(objLayer);
    }

    return JSON.stringify(objLevel);
  }

  public importlevel(levelJson: string, level: Level): void {
    level.mapGrid.clearGrid();

    const objLevel: LevelSerialization.Level = JSON.parse(levelJson);

    for (const layer of objLevel.layers) {
      for (const block of layer.blocks) {
        level.mapGrid.addBlock(new Phaser.Math.Vector2(block.x, block.y), block.name, layer.layerId);
      }
    }
  }
}
