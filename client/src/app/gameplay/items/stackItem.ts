import { Item } from './baseItem';

export class StackItem implements Item {
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
