"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelLoaderService = void 0;
const blocks_1 = require("../../core/blocks");
class LevelLoaderService {
    constructor(levelScene) {
        this.levelScene = levelScene;
    }
    exportLevel() {
        const minLevel = {
            l: []
        };
        for (const layer of this.levelScene.mapGrid.getUsedLayers()) {
            minLevel.l.push([
                layer,
                this.levelScene.mapGrid.getAllOfLayer(layer).map(b => [b.x, b.y, blocks_1.BlockIds.indexOf(b.name)])
            ]);
        }
        return JSON.stringify(minLevel);
    }
    importlevel(levelJson) {
        const minLevel = JSON.parse(levelJson);
        for (const layer of minLevel.l) {
            for (const block of layer[1]) {
                this.levelScene.mapGrid.addBlock(new Phaser.Math.Vector2(block[0], block[1]), blocks_1.BlockIds[block[2]], layer[0]);
            }
        }
    }
}
exports.LevelLoaderService = LevelLoaderService;
