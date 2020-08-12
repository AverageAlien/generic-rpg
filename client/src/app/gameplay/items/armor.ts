import { EquipmentItem } from './equipmentItem';

export class Armor extends EquipmentItem {
  public texture: string;

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
}
