import { GameObjects } from 'phaser';

import { ClientLevel } from './clientLevel';
import { EntitySpawnerService } from '../gameServices/entity-spawner.service';
import { Constants } from '../core/constants';
import { MapGrid } from '../core/mapGrid';
import { EditorOverlayService } from '../services/editor-overlay.service';
import { InputService } from '../gameServices/input.service';
import { NetworkingService } from '../services/networking.service';
import { UiOverlayService } from '../services/ui-overlay.service';
import { BlockErase, Blocks, BlockType } from '../core/blocks';

export class LevelEditor extends ClientLevel {
  private grid: GameObjects.Grid;
  private cursorActive = true;
  private eraseMode: BlockType = null;
  public localEntitySpawner: EntitySpawnerService;

  constructor(
    protected inputService: InputService,
    protected networkingService: NetworkingService,
    protected uiOverlay: UiOverlayService,
    protected editorOverlay: EditorOverlayService) {
    super(inputService, networkingService, uiOverlay);
  }

  create() {
    this.localEntitySpawner = new EntitySpawnerService();
    this.localEntitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);

    this.mapGrid = new MapGrid(this, 'tileset');

    this.player = this.localEntitySpawner.spawnPlayer('Editor', Phaser.Math.Vector2.ZERO, 60);
    this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);

    this.grid = this.add.grid(0, 0, 900, 708, 32, 32, 0x000000, 0, 0xffffff, 0.5);

    this.input.on('gameout', () => {
      this.cursorActive = false;
    });
    this.input.on('gameover', () => {
      this.cursorActive = true;
    });
    window.addEventListener('resize', () => {
      this.game.scale.updateBounds();
    });
    this.game.scale.updateBounds();
  }

  update() {
    this.entities.forEach(e => e.update());

    const gridPos = new Phaser.Math.Vector2 (
      this.snap(this.cameras.main.worldView.centerX, Constants.Level.GRID_SIZE_X) + 2,
      this.snap(this.cameras.main.worldView.centerY, Constants.Level.GRID_SIZE_Y) + 2
    );

    this.grid.setPosition(gridPos.x, gridPos.y);

    if (this.cursorActive) {

      const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

      const placePosition = new Phaser.Math.Vector2(
        Math.floor(worldPoint.x / Constants.Level.GRID_SIZE_X),
        Math.floor(worldPoint.y / Constants.Level.GRID_SIZE_Y)
      );

      if (this.input.manager.activePointer.leftButtonDown()) {
        this.handleBlockPlacement(this.editorOverlay.selectedLeftMouseBlock, placePosition);
      } else if (this.input.manager.activePointer.rightButtonDown()) {
        this.handleBlockPlacement(this.editorOverlay.selectedRightMouseBlock, placePosition);
      } else {
        this.eraseMode = null;
      }
    }
  }

  private handleBlockPlacement(blockId: string, placePosition: Phaser.Math.Vector2) {
    if (blockId == null) {
      return;
    }

    const foreground = this.mapGrid.getBlockAt(placePosition);
    const background = this.mapGrid.getBlockAt(placePosition, -1);

    if (blockId === BlockErase) {
      if (!this.eraseMode) {
        this.eraseMode = !!foreground ? BlockType.Foreground : BlockType.Background;
      }

      if ((!!foreground && this.eraseMode === BlockType.Foreground)
        || (!!background && this.eraseMode === BlockType.Background)) {
        this.mapGrid.removeBlockAt(placePosition, this.blockTypeToLayer(this.eraseMode));
      }

      return;
    }

    const blockInfo = Blocks.get(blockId);

    if ((!foreground && blockInfo.type === BlockType.Foreground)
      || (!background && blockInfo.type === BlockType.Background)) {
      this.mapGrid.addBlock(placePosition, blockId, this.blockTypeToLayer(blockInfo.type));
    }
  }

  private blockTypeToLayer(blockType: BlockType) {
    switch (blockType) {
      case BlockType.Foreground: return 0;
      case BlockType.Background: return -1;
    }
  }

  private snap(value: number, snapSize: number) {
    return value - (value % snapSize);
  }
}
