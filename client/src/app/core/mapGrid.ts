import { Tilemaps } from 'phaser';
import { BlockInfo, Blocks, BlockIds, BlockType } from './blocks';
import { LevelSerialization } from '../models/levelSerialization.model';
import { Constants } from './constants';
import { Level } from '../scenes/levelScene';

export class MapGrid {
  private tileMap: Tilemaps.Tilemap;
  private chunks: Tilemaps.DynamicTilemapLayer[][][] = [];
  private collidingBlocks: number[];

  constructor(private levelScene: Level, private tileSet: string) {
    this.tileMap = levelScene.make.tilemap({
      width: Constants.Level.CHUNK_W,
      height: Constants.Level.CHUNK_H,
      tileWidth: Constants.Level.GRID_SIZE_X,
      tileHeight: Constants.Level.GRID_SIZE_Y
    });

    this.tileMap.addTilesetImage(tileSet, tileSet,
      Constants.Level.GRID_SIZE_X,
      Constants.Level.GRID_SIZE_Y,
      1, 2);

    this.collidingBlocks = Array.from(Blocks.entries())
      .filter(e => e[1].type === BlockType.Foreground)
      .map(e => BlockIds.indexOf(e[0]));
  }

  public addBlock(pos: Phaser.Math.Vector2, block: string | BlockInfo, layer = 0) {
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

    chunk.putTileAt(
      BlockIds.indexOf(blockName),
      tilePos.x,
      tilePos.y
    );
  }

  public fillArea(pos: Phaser.Math.Vector2, size: Phaser.Math.Vector2, block: string | BlockInfo, layer = 0) {
    const lowerCorner = new Phaser.Math.Vector2(pos).add(size);
    for (let i = pos.x; i <= lowerCorner.x; ++i) {
      for (let j = pos.y; j <= lowerCorner.y; ++j) {
        this.addBlock(new Phaser.Math.Vector2(i, j), block, layer);
      }
    }
  }

  public getBlockAt(pos: Phaser.Math.Vector2, layer = 0): string {
    // TODO: rewrite this and the rest to return indices instead in order to optimize level exports
    const { chunkPos, tilePos } = this.localizeChunk(pos);
    if (!this.chunks[layer] ||
      !this.chunks[layer][chunkPos.x] ||
      !this.chunks[layer][chunkPos.x][chunkPos.y]) {
      return null;
    }
    const tile = this.chunks[layer][chunkPos.x][chunkPos.y].getTileAt(tilePos.x, tilePos.y);
    if (!tile) { return null; }
    return BlockIds[tile.index];
  }

  public getAll(): LevelSerialization.Block[] {
    return this.chunks.flatMap(x =>
      x.flatMap(y =>
        y.flatMap(chunk =>
          chunk.getTilesWithin().map(tile => {
            return {
              name: BlockIds[tile.index],
              x: tile.x + chunk.x / Constants.Level.GRID_SIZE_X,
              y: tile.y + chunk.y / Constants.Level.GRID_SIZE_Y
            } as LevelSerialization.Block;
          })
        )
      )
    );
  }

  public getAllChunks(layer?: number): Tilemaps.DynamicTilemapLayer[] {
    if (!layer) {
      return this.chunks.flatMap(L =>
        L.flatMap(row => row));
    }
    return this.chunks[layer].flatMap(row => row);
  }

  public getAllOfLayer(layer: number): LevelSerialization.Block[] {
    return this.chunks[layer].flatMap(row => {
      return row.flatMap(chunk => {
        return chunk.getTilesWithin().map(tile => {
          return {
            name: BlockIds[tile.index],
            x: tile.x + chunk.x / Constants.Level.GRID_SIZE_X,
            y: tile.y + chunk.y / Constants.Level.GRID_SIZE_Y
          } as LevelSerialization.Block;
        });
      });
    });
  }

  public getUsedLayers(): number[] {
    const usedLayers = new Set<number>();

    for (const layer in this.chunks) {
      if (this.chunks.hasOwnProperty(layer)) {
        usedLayers.add(Number(layer));
      }
    }

    return Array.from(usedLayers);
  }

  public removeBlockAt(pos: Phaser.Math.Vector2, layer = 0) {
    const { chunkPos, tilePos } = this.localizeChunk(pos);
    const chunk = this.chunks[layer][chunkPos.x][chunkPos.y].removeTileAt(tilePos.x, tilePos.y);
  }

  public clearGrid() {
    this.chunks.forEach(layer => layer.forEach(row => row.forEach(chunk => chunk.destroy())));

    this.chunks = [];
  }

  private ensureChunkExists(chunkPos: Phaser.Math.Vector2, layer = 0): Tilemaps.DynamicTilemapLayer {
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

  private createChunk(chunkPos: Phaser.Math.Vector2, layer = 0): Tilemaps.DynamicTilemapLayer {
    const chunk = this.tileMap.createBlankDynamicLayer(
      `chunk_${layer}_${chunkPos.x}_${chunkPos.y}`,
      this.tileSet,
      chunkPos.x * Constants.Level.GRID_SIZE_X * Constants.Level.CHUNK_W,
      chunkPos.y * Constants.Level.GRID_SIZE_Y * Constants.Level.CHUNK_H
    );

    chunk.setCollision(this.collidingBlocks);
    chunk.setDepth(layer);

    this.levelScene.physics.add.collider(this.levelScene.entities.map(e => e.gameObject), chunk);

    this.chunks[layer][chunkPos.x][chunkPos.y] = chunk;

    return chunk;
  }

  private resolveBlockInfo(block: string | BlockInfo): { blockName: string, blockData: BlockInfo } {
    let blockName: string = null;
    let blockData: BlockInfo;

    if (typeof block === 'string') {
      blockName = block;
      blockData = Blocks.get(blockName);
    } else {
      blockName = 'custom';
      blockData = block;
    }

    return { blockName, blockData };
  }

  private localizeChunk(pos: Phaser.Math.Vector2): { chunkPos: Phaser.Math.Vector2, tilePos: Phaser.Math.Vector2 } {
    const chunkPos = new Phaser.Math.Vector2(
      Math.floor(pos.x / Constants.Level.CHUNK_W),
      Math.floor(pos.y / Constants.Level.CHUNK_H)
    );

    const tilePos = new Phaser.Math.Vector2(pos)
      .subtract(new Phaser.Math.Vector2(chunkPos)
      .multiply(new Phaser.Math.Vector2(
        Constants.Level.CHUNK_W,
        Constants.Level.CHUNK_H
      ))
    );

    return { chunkPos, tilePos };
  }
}
