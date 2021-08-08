import { LevelSerialization } from '../models/levelSerialization.model';
import { LevelScene } from '../../core/levelScene';
import { BlockIds } from '../../core/blocks';
import { LocationDataService } from '../../services/locationDataService';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class LevelLoaderService {
  constructor(private levelScene: LevelScene, private locationLoader: LocationDataService) {}

  public exportLevel(): string {
    const minLevel: LevelSerialization.MinifiedLevel = {
      l: []
    };

    for (const layer of this.levelScene.mapGrid.getUsedLayers()) {
      minLevel.l.push([
        layer,
        this.levelScene.mapGrid.getAllOfLayer(layer).map(b => [b.x, b.y, BlockIds.indexOf(b.name)])
      ]);
    }

    return JSON.stringify(minLevel);
  }

  public importlevel(levelJson: string): void {
    const minLevel: LevelSerialization.MinifiedLevel = JSON.parse(levelJson);

    for (const layer of minLevel.l) {
      for (const block of layer[1]) {
        this.levelScene.mapGrid.addBlock(new Phaser.Math.Vector2(block[0], block[1]), BlockIds[block[2]], layer[0]);
      }
    }
  }

  public importLevelByName(levelName: string): Observable<boolean> {
    return this.locationLoader.loadLevelData(levelName)
    .pipe(map(dto => {
      this.importlevel(dto.leveldata);
      return true;
    }));
  }
}
