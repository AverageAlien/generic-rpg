import { EquipmentItem } from './equipmentItem';
import { DamageType, ItemType } from './itemEnums';

export class Weapon extends EquipmentItem {
  public itemType = ItemType.Weapon;

  public damage: Damage[];
  public reach: number;
  public refire: number; // ms
  public swing: number; // degrees

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
    this.refire = cfg.refire || 1000;
    this.reach = cfg.reach || 64;
    this.swing = cfg.swing || 90;
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
  refire?: number;
  reach?: number;
  swing?: number;
}
