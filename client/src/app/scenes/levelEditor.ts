import { Level } from './levelScene';
import { GameObjects } from 'phaser';
import { EntitySpawnerService } from '../services/entity-spawner.service';
import { Constants } from '../core/constants';
import { BlockPlacer } from '../core/blockPlacer';
import { MapGrid } from '../core/mapGrid';

export class LevelEditor extends Level {
  private grid: GameObjects.Grid;

  create() {
    this.entitySpawner = new EntitySpawnerService();
    this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);

    this.blockPlacer = new BlockPlacer();
    this.blockPlacer.init(this);

    this.mapGrid = new MapGrid(this.blockPlacer);

    this.player = this.entitySpawner.spawnPlayer('maxi', new Phaser.Math.Vector2(11, 9), 60);
    this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);

    this.grid = this.add.grid(0, 0, 900, 708, 32, 32, 0x000000, 0, 0xffffff, 0.5);
  }

  update() {
    this.entities.forEach(e => e.update());

    const gridPos = new Phaser.Math.Vector2 (
      this.snap(this.cameras.main.worldView.centerX, Constants.Level.GRID_SIZE_X) + Constants.Level.GRID_SIZE_X / 2 + 2,
      this.snap(this.cameras.main.worldView.centerY, Constants.Level.GRID_SIZE_Y) + Constants.Level.GRID_SIZE_Y / 2 + 2
    );
    console.log(`${gridPos.x}; ${gridPos.y}`);

    this.grid.setPosition(gridPos.x, gridPos.y);
    console.log(`${this.grid.x}; ${this.grid.y}`);

    if (this.input.manager.activePointer.leftButtonDown()) {
      const placePosition = new Phaser.Math.Vector2(
        Math.round(this.input.activePointer.worldX / Constants.Level.GRID_SIZE_X),
        Math.round(this.input.activePointer.worldY / Constants.Level.GRID_SIZE_Y)
      );

      if (!this.mapGrid.getBlockAt(placePosition)) {
        this.mapGrid.addBlock(placePosition, 'stone_bricks');
      }

    }
  }

  private snap(value: number, snapSize: number) {
    return value - (value % snapSize);
  }
}
