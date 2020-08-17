"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapGrid = void 0;
const blocks_1 = require("./blocks");
const constants_1 = require("./constants");
class MapGrid {
    constructor(levelScene, tileSet) {
        this.levelScene = levelScene;
        this.tileSet = tileSet;
        this.chunks = [];
        this.tileMap = levelScene.make.tilemap({
            width: constants_1.Constants.Level.CHUNK_W,
            height: constants_1.Constants.Level.CHUNK_H,
            tileWidth: constants_1.Constants.Level.GRID_SIZE_X,
            tileHeight: constants_1.Constants.Level.GRID_SIZE_Y
        });
        this.tileMap.addTilesetImage(tileSet, tileSet, constants_1.Constants.Level.GRID_SIZE_X, constants_1.Constants.Level.GRID_SIZE_Y, 1, 2);
        this.collidingBlocks = Array.from(blocks_1.Blocks.entries())
            .filter(e => e[1].type === blocks_1.BlockType.Foreground)
            .map(e => blocks_1.BlockIds.indexOf(e[0]));
    }
    addBlock(pos, block, layer = 0) {
        const { blockName, blockData } = this.resolveBlockInfo(block);
        const { chunkPos, tilePos } = this.localizeChunk(pos);
        const chunk = this.ensureChunkExists(chunkPos, layer);
        chunk.putTileAt(blocks_1.BlockIds.indexOf(blockName), tilePos.x, tilePos.y);
    }
    fillArea(pos, size, block, layer = 0) {
        const lowerCorner = new Phaser.Math.Vector2(pos).add(size);
        for (let i = pos.x; i <= lowerCorner.x; ++i) {
            for (let j = pos.y; j <= lowerCorner.y; ++j) {
                this.addBlock(new Phaser.Math.Vector2(i, j), block, layer);
            }
        }
    }
    getBlockAt(pos, layer = 0) {
        // TODO: rewrite this and the rest to return indices instead in order to optimize level exports
        const { chunkPos, tilePos } = this.localizeChunk(pos);
        if (!this.chunks[layer] ||
            !this.chunks[layer][chunkPos.x] ||
            !this.chunks[layer][chunkPos.x][chunkPos.y]) {
            return null;
        }
        const tile = this.chunks[layer][chunkPos.x][chunkPos.y].getTileAt(tilePos.x, tilePos.y);
        if (!tile) {
            return null;
        }
        return blocks_1.BlockIds[tile.index];
    }
    getAll() {
        return this.chunks.flatMap(x => x.flatMap(y => y.flatMap(chunk => chunk.getTilesWithin().map(tile => {
            return {
                name: blocks_1.BlockIds[tile.index],
                x: tile.x + chunk.x / constants_1.Constants.Level.GRID_SIZE_X,
                y: tile.y + chunk.y / constants_1.Constants.Level.GRID_SIZE_Y
            };
        }))));
    }
    getAllChunks(layer) {
        if (!layer) {
            return this.chunks.flatMap(L => L.flatMap(row => row));
        }
        return this.chunks[layer].flatMap(row => row);
    }
    getAllOfLayer(layer) {
        return Object.values(this.chunks[layer]).flatMap(row => {
            return Object.values(row).flatMap(chunk => {
                return chunk.getTilesWithin(0, 0, undefined, undefined, { isNotEmpty: true }).map(tile => {
                    return {
                        name: blocks_1.BlockIds[tile.index],
                        x: tile.x + chunk.x / constants_1.Constants.Level.GRID_SIZE_X,
                        y: tile.y + chunk.y / constants_1.Constants.Level.GRID_SIZE_Y
                    };
                });
            });
        });
    }
    getUsedLayers() {
        const usedLayers = new Set();
        for (const layer in this.chunks) {
            if (this.chunks.hasOwnProperty(layer)) {
                usedLayers.add(Number(layer));
            }
        }
        return Array.from(usedLayers);
    }
    removeBlockAt(pos, layer = 0) {
        const { chunkPos, tilePos } = this.localizeChunk(pos);
        const chunk = this.chunks[layer][chunkPos.x][chunkPos.y].removeTileAt(tilePos.x, tilePos.y);
    }
    clearGrid() {
        this.chunks.forEach(layer => layer.forEach(row => row.forEach(chunk => chunk.destroy())));
        this.chunks = [];
    }
    ensureChunkExists(chunkPos, layer = 0) {
        if (!this.chunks[layer]) {
            this.chunks[layer] = [];
        }
        if (!this.chunks[layer][chunkPos.x]) {
            this.chunks[layer][chunkPos.x] = [];
        }
        if (!this.chunks[layer][chunkPos.x][chunkPos.y]) {
            return this.createChunk(chunkPos, layer);
        }
        return this.chunks[layer][chunkPos.x][chunkPos.y];
    }
    createChunk(chunkPos, layer = 0) {
        const chunk = this.tileMap.createBlankDynamicLayer(`chunk_${layer}_${chunkPos.x}_${chunkPos.y}`, this.tileSet, chunkPos.x * constants_1.Constants.Level.GRID_SIZE_X * constants_1.Constants.Level.CHUNK_W, chunkPos.y * constants_1.Constants.Level.GRID_SIZE_Y * constants_1.Constants.Level.CHUNK_H);
        chunk.setCollision(this.collidingBlocks);
        chunk.setDepth(layer);
        this.levelScene.physics.add.collider(this.levelScene.entities.map(e => e.gameObject), chunk);
        this.chunks[layer][chunkPos.x][chunkPos.y] = chunk;
        return chunk;
    }
    resolveBlockInfo(block) {
        let blockName = null;
        let blockData;
        if (typeof block === 'string') {
            blockName = block;
            blockData = blocks_1.Blocks.get(blockName);
        }
        else {
            blockName = 'custom';
            blockData = block;
        }
        return { blockName, blockData };
    }
    localizeChunk(pos) {
        const chunkPos = new Phaser.Math.Vector2(Math.floor(pos.x / constants_1.Constants.Level.CHUNK_W), Math.floor(pos.y / constants_1.Constants.Level.CHUNK_H));
        const tilePos = new Phaser.Math.Vector2(pos)
            .subtract(new Phaser.Math.Vector2(chunkPos)
            .multiply(new Phaser.Math.Vector2(constants_1.Constants.Level.CHUNK_W, constants_1.Constants.Level.CHUNK_H)));
        return { chunkPos, tilePos };
    }
}
exports.MapGrid = MapGrid;
