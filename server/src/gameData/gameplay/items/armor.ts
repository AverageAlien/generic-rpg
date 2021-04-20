import { EquipmentItem } from './equipmentItem';
import { ArmorType } from './itemEnums';

export class Armor extends EquipmentItem {
  public armor: number;
  public armorType: ArmorType;

  constructor(cfg: ArmorConfig) {
    super(
      cfg.name,
      cfg.texture,
      cfg.description || 'No information.',
      cfg.price || 0,
      cfg.mass || 0,
      cfg.level || 1
    );

    this.texture = cfg.texture;
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
}
