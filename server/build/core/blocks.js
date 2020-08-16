export var BlockType;
(function (BlockType) {
    BlockType[BlockType["Background"] = 0] = "Background";
    BlockType[BlockType["Foreground"] = 1] = "Foreground";
})(BlockType || (BlockType = {}));
export const Blocks = new Map([
    ['grass', { type: BlockType.Background, texture: 'grass01' }],
    ['stone_floor', { type: BlockType.Background, texture: 'stone_floor01' }],
    ['stone_bricks', { type: BlockType.Foreground, texture: 'stone_wall01' }],
]);
export const BlockIds = Array.from(Blocks.keys());
//# sourceMappingURL=blocks.js.map