"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelEditor = void 0;
const clientLevel_1 = require("./clientLevel");
const entity_spawner_service_1 = require("../gameServices/entity-spawner.service");
const mapGrid_1 = require("../../core/mapGrid");
const constants_1 = require("../../core/constants");
class LevelEditor extends clientLevel_1.ClientLevel {
    constructor() {
        super(...arguments);
        this.cursorActive = true;
    }
    create() {
        this.entitySpawner = new entity_spawner_service_1.EntitySpawnerService();
        this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);
        this.mapGrid = new mapGrid_1.MapGrid(this, 'tileset');
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
        const gridPos = new Phaser.Math.Vector2(this.snap(this.cameras.main.worldView.centerX, constants_1.Constants.Level.GRID_SIZE_X) + 2, this.snap(this.cameras.main.worldView.centerY, constants_1.Constants.Level.GRID_SIZE_Y) + 2);
        this.grid.setPosition(gridPos.x, gridPos.y);
        // this.input.activePointer.updateWorldPoint(this.cameras.main);
        if (this.cursorActive) {
            const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            const placePosition = new Phaser.Math.Vector2(Math.floor(worldPoint.x / constants_1.Constants.Level.GRID_SIZE_X), Math.floor(worldPoint.y / constants_1.Constants.Level.GRID_SIZE_Y));
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
exports.LevelEditor = LevelEditor;
