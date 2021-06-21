import { BlockType } from '../core/blocks';

export interface BlockItem { // for editor
  id: string;
  texture: string;
  layer: BlockType;
}
