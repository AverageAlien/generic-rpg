import { ClientLevel } from './clientLevel';
import { EntitySpawnerService } from '../gameServices/entity-spawner.service';
import { MapGrid } from '../../core/mapGrid';
import { Constants } from '../../core/constants';
export class LevelEditor extends ClientLevel {
    constructor() {
        super(...arguments);
        this.cursorActive = true;
    }
    create() {
        this.entitySpawner = new EntitySpawnerService();
        this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);
        this.mapGrid = new MapGrid(this, 'tileset');
        this.player = this.entitySpawner.spawnPlayer('Editor', Phaser.Math.Vector2.ZERO, 60);
        this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);
        this.grid = this.add.grid(0, 0, 900, 708, 32, 32, 0x000000, 0, 0xffffff, 0.5);
        this.input.on('gameout', () => {
            this.cursorActive = false;
        });
        this.input.on('gameover', () => {
            this.cursorActive = true;
        });
    }
    update() {
        this.entities.forEach(e => e.update());
        const gridPos = new Phaser.Math.Vector2(this.snap(this.cameras.main.worldView.centerX, Constants.Level.GRID_SIZE_X) + 2, this.snap(this.cameras.main.worldView.centerY, Constants.Level.GRID_SIZE_Y) + 2);
        this.grid.setPosition(gridPos.x, gridPos.y);
        // this.input.activePointer.updateWorldPoint(this.cameras.main);
        if (this.cursorActive) {
            const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            const placePosition = new Phaser.Math.Vector2(Math.floor(worldPoint.x / Constants.Level.GRID_SIZE_X), Math.floor(worldPoint.y / Constants.Level.GRID_SIZE_Y));
            if (this.input.manager.activePointer.leftButtonDown()) {
                if (!this.mapGrid.getBlockAt(placePosition)) {
                    this.mapGrid.addBlock(placePosition, 'stone_bricks');
                }
            }
            else if (this.input.manager.activePointer.rightButtonDown()) {
                if (!this.mapGrid.getBlockAt(placePosition, -1)) {
                    this.mapGrid.addBlock(placePosition, 'stone_floor', -1);
                }
            }
        }
    }
    snap(value, snapSize) {
        return value - (value % snapSize);
    }
}
//# sourceMappingURL=levelEditor.js.map