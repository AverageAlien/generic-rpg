import { Blocks, BlockIds, BlockType } from './blocks';
import { Constants } from './constants';
export class MapGrid {
    constructor(levelScene, tileSet) {
        this.levelScene = levelScene;
        this.tileSet = tileSet;
        this.chunks = [];
        this.tileMap = levelScene.make.tilemap({
            width: Constants.Level.CHUNK_W,
            height: Constants.Level.CHUNK_H,
            tileWidth: Constants.Level.GRID_SIZE_X,
            tileHeight: Constants.Level.GRID_SIZE_Y
        });
        this.tileMap.addTilesetImage(tileSet, tileSet, Constants.Level.GRID_SIZE_X, Constants.Level.GRID_SIZE_Y, 1, 2);
        this.collidingBlocks = Array.from(Blocks.entries())
            .filter(e => e[1].type === BlockType.Foreground)
            .map(e => BlockIds.indexOf(e[0]));
    }
    addBlock(pos, block, layer = 0) {
        const { blockName, blockData } = this.resolveBlockInfo(block);
        const { chunkPos, tilePos } = this.localizeChunk(pos);
        // const chunkPos = new Phaser.Math.Vector2(
        //   Math.floor(pos.x / Constants.Level.CHUNK_W),
        //   Math.floor(pos.y / Constants.Level.CHUNK_H)
        // );
        const chunk = this.ensureChunkExists(chunkPos, layer);
        // const tilePosInChunk = new Phaser.Math.Vector2(pos)
        //   .subtract(new Phaser.Math.Vector2(chunkPos)
        //     .multiply(new Phaser.Math.Vector2(
        //       Constants.Level.CHUNK_W,
        //       Constants.Level.CHUNK_H
        //     ))
        //   );
        chunk.putTileAt(BlockIds.indexOf(blockName), tilePos.x, tilePos.y);
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
        return BlockIds[tile.index];
    }
    getAll() {
        return this.chunks.flatMap(x => x.flatMap(y => y.flatMap(chunk => chunk.getTilesWithin().map(tile => {
            return {
                name: BlockIds[tile.index],
                x: tile.x + chunk.x / Constants.Level.GRID_SIZE_X,
                y: tile.y + chunk.y / Constants.Level.GRID_SIZE_Y
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
                        name: BlockIds[tile.index],
                        x: tile.x + chunk.x / Constants.Level.GRID_SIZE_X,
                        y: tile.y + chunk.y / Constants.Level.GRID_SIZE_Y
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
        const chunk = this.tileMap.createBlankDynamicLayer(`chunk_${layer}_${chunkPos.x}_${chunkPos.y}`, this.tileSet, chunkPos.x * Constants.Level.GRID_SIZE_X * Constants.Level.CHUNK_W, chunkPos.y * Constants.Level.GRID_SIZE_Y * Constants.Level.CHUNK_H);
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
            blockData = Blocks.get(blockName);
        }
        else {
            blockName = 'custom';
            blockData = block;
        }
        return { blockName, blockData };
    }
    localizeChunk(pos) {
        const chunkPos = new Phaser.Math.Vector2(Math.floor(pos.x / Constants.Level.CHUNK_W), Math.floor(pos.y / Constants.Level.CHUNK_H));
        const tilePos = new Phaser.Math.Vector2(pos)
            .subtract(new Phaser.Math.Vector2(chunkPos)
            .multiply(new Phaser.Math.Vector2(Constants.Level.CHUNK_W, Constants.Level.CHUNK_H)));
        return { chunkPos, tilePos };
    }
}
//# sourceMappingURL=mapGrid.js.map