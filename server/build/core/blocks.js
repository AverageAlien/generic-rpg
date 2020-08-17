"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockIds = exports.Blocks = exports.BlockType = void 0;
var BlockType;
(function (BlockType) {
    BlockType[BlockType["Background"] = 0] = "Background";
    BlockType[BlockType["Foreground"] = 1] = "Foreground";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
exports.Blocks = new Map([
    ['grass', { type: BlockType.Background, texture: 'grass01' }],
    ['stone_floor', { type: BlockType.Background, texture: 'stone_floor01' }],
    ['stone_bricks', { type: BlockType.Foreground, texture: 'stone_wall01' }],
]);
exports.BlockIds = Array.from(exports.Blocks.keys());
