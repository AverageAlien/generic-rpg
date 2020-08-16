"use strict";
exports.__esModule = true;
var blocks_1 = require("src/core/blocks");
var LevelLoaderService = /** @class */ (function () {
    function LevelLoaderService() {
    }
    LevelLoaderService.exportLevel = function (level) {
        var minLevel = {
            l: []
        };
        for (var _i = 0, _a = level.mapGrid.getUsedLayers(); _i < _a.length; _i++) {
            var layer = _a[_i];
            minLevel.l.push([
                layer,
                level.mapGrid.getAllOfLayer(layer).map(function (b) { return [b.x, b.y, blocks_1.BlockIds.indexOf(b.name)]; })
            ]);
        }
        return JSON.stringify(minLevel);
    };
    LevelLoaderService.importlevel = function (levelJson, level) {
        var minLevel = JSON.parse(levelJson);
        for (var _i = 0, _a = minLevel.l; _i < _a.length; _i++) {
            var layer = _a[_i];
            for (var _b = 0, _c = layer[1]; _b < _c.length; _b++) {
                var block = _c[_b];
                level.mapGrid.addBlock(new Phaser.Math.Vector2(block[0], block[1]), blocks_1.BlockIds[block[2]], layer[0]);
            }
        }
    };
    return LevelLoaderService;
}());
exports.LevelLoaderService = LevelLoaderService;
