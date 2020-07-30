import { Injectable } from '@angular/core';
import { Level } from '../scenes/levelScene';
import { LevelSerialization } from '../models/levelSerialization.model';
import * as msgpack from 'msgpack-lite';
import * as base65536 from 'base65536';

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

    // const json = JSON.stringify(objLevel);
    // const based = base65536.encode(msgpack.encode(objLevel));

    // console.log(json);
    // console.log(based);
    // console.log([...json].length);
    // console.log([...based].length);

    return JSON.stringify(objLevel);
  }

  public importlevel(levelJson: string, level: Level): void {
    const objLevel: LevelSerialization.Level = JSON.parse(levelJson);

    level.mapGrid.clearGrid();

    for (const layer of objLevel.layers) {
      for (const block of layer.blocks) {
        level.mapGrid.addBlock(new Phaser.Math.Vector2(block.x, block.y), block.name, layer.layerId);
      }
    }
  }
}
