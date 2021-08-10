import { v4 as UUID } from 'uuid';
import { EquipmentItem } from './equipmentItem';
import { ArmorType, ItemType } from './itemEnums';

export class Armor extends EquipmentItem {
  public itemType = ItemType.Armor;

  public armor: number;
  public armorType: ArmorType;

  constructor(cfg: ArmorConfig) {
    super(
      cfg.itemId || UUID(),
      cfg.name,
      cfg.texture,
      cfg.description || 'No information.',
      cfg.price || 0,
      cfg.mass || 0,
      cfg.level || 1
    );

    this.armor = cfg.armor || 0;
    this.armorType = cfg.armorType || ArmorType.Chestplate;
  }
}

interface ArmorConfig {
  name: string;
  texture: string;
  description?: string;
  price?: number;
  mass?: number;
  level?: number;
  armor?: number;
  armorType?: ArmorType;
  itemId?: string;
}
