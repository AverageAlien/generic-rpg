import { EquipmentItem } from './equipmentItem';
import { DamageType } from './itemEnums';

export class Weapon extends EquipmentItem {
  public damage: Damage[];

  constructor(cfg: WeaponConfig) {
    super(
      cfg.name,
      cfg.texture,
      cfg.description || 'No information.',
      cfg.price || 0,
      cfg.mass || 0,
      cfg.level || 1
    );

    this.damage = cfg.damage || [];
  }
}

interface Damage {
  value: number;
  type: DamageType;
}

interface WeaponConfig {
  name: string;
  texture: string;
  description?: string;
  price?: number;
  mass?: number;
  level?: number;
  damage?: Damage[];
}
