import { Math } from 'phaser';
import { StaticBlock } from '../gameplay/statics/baseStatic';
import { BlockPlacer } from './blockPlacer';
import { BlockInfo } from './blocks';

export class MapGrid {
  private map = new Map<Math.Vector3, StaticBlock>();

  constructor(private blockPlacer: BlockPlacer) {}

  public addBlock(pos: Math.Vector2, block: string | BlockInfo, layer = 0) {
    const staticBlock = this.blockPlacer.addBlock(pos, block);

    this.map.set(new Phaser.Math.Vector3(pos.x, pos.y, layer), staticBlock);
  }

  public fillArea(pos: Math.Vector2, size: Math.Vector2, block: string | BlockInfo, layer = 0) {
    const lowerCorner = new Math.Vector2(pos).add(size);
    for (let i = pos.x; i <= lowerCorner.x; ++i) {
      for (let j = pos.y; j <= lowerCorner.y; ++j) {
        this.addBlock(new Math.Vector2(i, j), block, layer);
      }
    }
  }

  public getBlockAt(pos: Math.Vector2, layer = 0) {
    return this.map.get(new Math.Vector3(pos.x, pos.y, layer));
  }

  public getAll(): StaticBlock[] {
    return Array.from(this.map.values());
  }

  public removeBlockAt(pos: Math.Vector2, layer = 0) {
    const key = new Math.Vector3(pos.x, pos.y, layer);
    const target = this.map.get(key);
    this.map.delete(key);
    target.gameObject.destroy();
  }
}
