import { BlockIds } from '../../core/blocks';
export class LevelLoaderService {
    static exportLevel(level) {
        const minLevel = {
            l: []
        };
        for (const layer of level.mapGrid.getUsedLayers()) {
            minLevel.l.push([
                layer,
                level.mapGrid.getAllOfLayer(layer).map(b => [b.x, b.y, BlockIds.indexOf(b.name)])
            ]);
        }
        return JSON.stringify(minLevel);
    }
    static importlevel(levelJson, level) {
        const minLevel = JSON.parse(levelJson);
        for (const layer of minLevel.l) {
            for (const block of layer[1]) {
                level.mapGrid.addBlock(new Phaser.Math.Vector2(block[0], block[1]), BlockIds[block[2]], layer[0]);
            }
        }
    }
}
//# sourceMappingURL=level-loader.service.js.map