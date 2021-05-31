import { ItemType } from './itemEnums';

export interface Item {
  itemType: ItemType;
  name: string;
  texture: string;
  description: string;
  price: number;
  mass: number;
}
