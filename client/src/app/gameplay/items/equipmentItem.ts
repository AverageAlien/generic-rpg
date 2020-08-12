import { Item } from './baseItem';

export class EquipmentItem implements Item {
  constructor(
    public name: string,
    public texture: string,
    public description: string,
    public price: number,
    public mass: number,
    public level: number
  ) {}
}
