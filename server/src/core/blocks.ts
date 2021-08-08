export enum BlockType {
  Background,
  Foreground
}

export interface BlockInfo {
  type: BlockType;
  texture: string;
  z_index?: number;
}

export const Blocks = new Map<string, BlockInfo>([
  ['grass', {type: BlockType.Background, texture: 'grass01'}],
  ['stone_floor', {type: BlockType.Background, texture: 'stone_floor01'}],
  ['stone_bricks', {type: BlockType.Foreground, texture: 'stone_wall01'}],
  ['wooden_floor', {type: BlockType.Background, texture: 'wooden_floor01'}],
]) as ReadonlyMap<string, BlockInfo>;

export const BlockIds = Array.from(Blocks.keys());
