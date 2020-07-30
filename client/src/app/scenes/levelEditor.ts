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

    this.player = this.entitySpawner.spawnPlayer('Editor', Phaser.Math.Vector2.ZERO, 60);
    this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);
    this.input.mouse.disableContextMenu();

    this.grid = this.add.grid(0, 0, 900, 708, 32, 32, 0x000000, 0, 0xffffff, 0.5);
  }

  update() {
    this.entities.forEach(e => e.update());

    const gridPos = new Phaser.Math.Vector2 (
      this.snap(this.cameras.main.worldView.centerX, Constants.Level.GRID_SIZE_X) + Constants.Level.GRID_SIZE_X / 2 + 2,
      this.snap(this.cameras.main.worldView.centerY, Constants.Level.GRID_SIZE_Y) + Constants.Level.GRID_SIZE_Y / 2 + 2
    );

    this.grid.setPosition(gridPos.x, gridPos.y);


    if (this.input.activePointer.x >= 0 && this.input.activePointer.x < Constants.Screen.SCREEN_W &&
        this.input.activePointer.y >= 0 && this.input.activePointer.y < Constants.Screen.SCREEN_H) {

      if (this.input.manager.activePointer.leftButtonDown()) {
        const placePosition = new Phaser.Math.Vector2(
          Math.round(this.input.activePointer.worldX / Constants.Level.GRID_SIZE_X),
          Math.round(this.input.activePointer.worldY / Constants.Level.GRID_SIZE_Y)
        );

        if (!this.mapGrid.getBlockAt(placePosition)) {
          this.mapGrid.addBlock(placePosition, 'stone_bricks');
        }
      } else if (this.input.manager.activePointer.rightButtonDown()) {
        const placePosition = new Phaser.Math.Vector2(
          Math.round(this.input.activePointer.worldX / Constants.Level.GRID_SIZE_X),
          Math.round(this.input.activePointer.worldY / Constants.Level.GRID_SIZE_Y)
        );

        if (!this.mapGrid.getBlockAt(placePosition, -1)) {
          this.mapGrid.addBlock(placePosition, 'stone_floor', -1);
        }
      }
    }
  }

  private snap(value: number, snapSize: number) {
    return value - (value % snapSize);
  }
}
