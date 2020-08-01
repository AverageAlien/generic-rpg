import { Tilemaps } from 'phaser';
import { StaticBlock } from '../gameplay/statics/baseStatic';
import { BlockPlacer } from './blockPlacer';
import { BlockInfo, Blocks, BlockIds, BlockType } from './blocks';
import { LevelSerialization } from '../models/levelSerialization.model';
import { Constants } from './constants';
import { Level } from '../scenes/levelScene';

export class MapGrid {
  private map = new Map<string, StaticBlock>();
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
    const tile = this.chunks[layer][chunkPos.x][chunkPos.y].getTileAt(tilePos.x, tilePos.y);
    return BlockIds[tile.index];
  }

  public getAll(): LevelSerialization.Block[] {
    const allBlocks: LevelSerialization.Block[] = [];

    this.chunks.flatMap(x => {
      return x.flatMap(y => {
        return y.flatMap(chunk => {
          const chunkBlocks: LevelSerialization.Block[] = [];

          chunk.getTilesWithin();

          return chunkBlocks;
        });
      });
    });

    this.chunks.forEach(x => {
      x.forEach(y => {
        y.forEach(chunk => {
          allBlocks.push({

          })
        });
      });
    });
    return Array.from(this.map.values());
  }

  public getAllOfLayer(layer: number): LevelSerialization.Block[] {
    return Array.from(this.map.entries())
      .filter(e => this.strToVector3(e[0]).z === layer)
      .map(e => {
        return {
          name: e[1].name,
          x: this.strToVector3(e[0]).x,
          y: this.strToVector3(e[0]).y
        };
      });
  }

  public getUsedLayers(): number[] {
    const usedLayers = new Set<number>();

    for (const key of this.map.keys()) {
      usedLayers.add(this.strToArray(key)[2]);
    }

    return Array.from(usedLayers);
  }

  public removeBlockAt(pos: Phaser.Math.Vector2, layer = 0) {
    const key = new Phaser.Math.Vector3(pos.x, pos.y, layer);
    const target = this.map.get(this.numbersToStr(pos. x, pos.y, layer));
    this.map.delete(this.numbersToStr(pos.x, pos.y, layer));
    target.gameObject.destroy();
  }

  public clearGrid() {
    for (const block of this.map.values()) {
      block.gameObject.destroy();
    }

    this.map.clear();
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

  private unlocalizeTile(tilePos: Phaser.Math.Vector2, chunkPos: Phaser.Math.Vector2): Phaser.Math.Vector2 {
    const chunkTilePos = new Phaser.Math.Vector2(
      Math.floor(chunkPos.x / Constants.Level.CHUNK_W),
      Math.floor(chunkPos.y / Constants.Level.CHUNK_H)
    );
  }
}
