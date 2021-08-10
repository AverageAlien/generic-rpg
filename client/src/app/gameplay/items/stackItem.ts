import { Item } from './baseItem';
import { ItemType } from './itemEnums';

export class StackItem implements Item {
  public itemType = ItemType.StackItem;

  constructor(
    public itemId: string,
    public name: string,
    public texture: string,
    public description: string,
    public price: number,
    public quantity: number,
    public unitMass: number
  ) {}

  // TODO: move this method out of the class
  // We do not want Item classes to have any methods since they will be broken after serialization
  public get mass(): number {
    return this.unitMass * this.quantity;
  }
}
