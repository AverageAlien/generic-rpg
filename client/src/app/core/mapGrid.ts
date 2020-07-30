import { Math } from 'phaser';
import { StaticBlock } from '../gameplay/statics/baseStatic';
import { BlockPlacer } from './blockPlacer';
import { BlockInfo } from './blocks';
import { LevelSerialization } from '../models/levelSerialization.model';

export class MapGrid {
  private map = new Map<string, StaticBlock>();

  constructor(private blockPlacer: BlockPlacer) {}

  public addBlock(pos: Math.Vector2, block: string | BlockInfo, layer = 0) {
    const staticBlock = this.blockPlacer.addBlock(pos, block);

    this.map.set(this.numbersToStr(pos.x, pos.y, layer), staticBlock);
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
    return this.map.get(this.numbersToStr(pos.x, pos.y, layer));
  }

  public getAll(): StaticBlock[] {
    return Array.from(this.map.values());
  }

  public getAllOfLayer(layer: number): StaticBlock[] {
    return Array.from(this.map.entries())
      .filter(e => this.strToVector3(e[0]).z === layer)
      .map(e => e[1]);
  }

  public getAllOfLayerSerialized(layer: number): LevelSerialization.Block[] {
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

  public removeBlockAt(pos: Math.Vector2, layer = 0) {
    const key = new Math.Vector3(pos.x, pos.y, layer);
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

  private strToVector3(str: string): Math.Vector3 {
    const numbers = str.split('/');

    return new Math.Vector3(
      Number.parseInt(numbers[0], 10),
      Number.parseInt(numbers[1], 10),
      Number.parseInt(numbers[2], 10),
    );
  }

  private strToArray(str: string): number[] {
    const numbers = str.split('/');

    return [
      Number.parseInt(numbers[0], 10),
      Number.parseInt(numbers[1], 10),
      Number.parseInt(numbers[2], 10)
    ];
  }

  private vector3ToStr(vector: Math.Vector3): string {
    return `${vector.x}/${vector.y}/${vector.z}`;
  }

  private numbersToStr(x: number, y: number, layer: number) {
    return `${x}/${y}/${layer}`;
  }
}
