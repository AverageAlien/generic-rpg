import { Item } from './baseItem';
import { ItemType } from './itemEnums';

export class EquipmentItem implements Item {
  public itemType = ItemType.EquipmentItem;

  constructor(
    public itemId: string,
    public name: string,
    public texture: string,
    public description: string,
    public price: number,
    public mass: number,
    public level: number
  ) {}
}
