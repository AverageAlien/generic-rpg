import { ItemType } from './itemEnums';

export interface Item {
  itemType: ItemType;
  itemId: string;
  name: string;
  texture: string;
  description: string;
  price: number;
  mass: number;
}
