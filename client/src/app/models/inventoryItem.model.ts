import { ItemType } from '../gameplay/items/itemEnums';
import { Damage } from '../gameplay/items/weapon';

export interface InventoryItem {
  type: ItemType;
  icon: string;
  name: string;
  description: string;
  mass: number;
  price: number;

  damage?: Damage[];
  level?: number;
  armor?: number;

}
