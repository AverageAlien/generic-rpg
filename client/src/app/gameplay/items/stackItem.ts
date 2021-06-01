import { Item } from './baseItem';
import { ItemType } from './itemEnums';

export class StackItem implements Item {
  public itemType = ItemType.StackItem;

  constructor(
    public name: string,
    public texture: string,
    public description: string,
    public price: number,
    public quantity: number,
    public unitMass: number
  ) {}

  public get mass(): number {
    return this.unitMass * this.quantity;
  }
}
