import { Level } from './levelScene';
import { GameObjects } from 'phaser';
import { EntitySpawnerService } from '../services/entity-spawner.service';
import { Constants } from '../core/constants';
import { BlockPlacer } from '../core/blockPlacer';
import { MapGrid } from '../core/mapGrid';

export class LevelEditor extends Level {
  private grid: GameObjects.Grid;
  private cursorActive = true;

  create() {
    this.entitySpawner = new EntitySpawnerService();
    this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);

    this.blockPlacer = new BlockPlacer();
    this.blockPlacer.init(this);

    this.mapGrid = new MapGrid(this, 'tileset');

    this.player = this.entitySpawner.spawnPlayer('Editor', Phaser.Math.Vector2.ZERO, 60);
    this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);

    this.grid = this.add.grid(0, 0, 900, 708, 32, 32, 0x000000, 0, 0xffffff, 0.5);

    this.input.mouse.disableContextMenu();
    this.input.on('gameout', () => {
      this.cursorActive = false;
    });
    this.input.on('gameover', () => {
      this.cursorActive = true;
    });

    console.log(this.sys.game.canvas.width, this.sys.game.canvas.height);

    // window.addEventListener('resize', () => {
    //   const mainCam = this.cameras.main;
    //   this.cameras.add(0, 0, 800, 608, true);

    //   this.cameras.remove(mainCam);
    // });
  }

  update() {
    this.entities.forEach(e => e.update());

    const gridPos = new Phaser.Math.Vector2 (
      this.snap(this.cameras.main.worldView.centerX, Constants.Level.GRID_SIZE_X) + Constants.Level.GRID_SIZE_X / 2 + 2,
      this.snap(this.cameras.main.worldView.centerY, Constants.Level.GRID_SIZE_Y) + Constants.Level.GRID_SIZE_Y / 2 + 2
    );

    this.grid.setPosition(gridPos.x, gridPos.y);

    // this.input.activePointer.updateWorldPoint(this.cameras.main);

    if (this.cursorActive) {

      const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

      if (this.input.manager.activePointer.leftButtonDown()) {
        const placePosition = new Phaser.Math.Vector2(
          Math.round(worldPoint.x / Constants.Level.GRID_SIZE_X),
          Math.round(worldPoint.y / Constants.Level.GRID_SIZE_Y)
        );


        console.log(`${this.input.manager.activePointer.x}; ${this.input.manager.activePointer.y}`);

        if (!this.mapGrid.getBlockAt(placePosition)) {
          this.mapGrid.addBlock(placePosition, 'stone_bricks');
        }
      } else if (this.input.manager.activePointer.rightButtonDown()) {
        const placePosition = new Phaser.Math.Vector2(
          Math.round(worldPoint.x / Constants.Level.GRID_SIZE_X),
          Math.round(worldPoint.y / Constants.Level.GRID_SIZE_Y)
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
