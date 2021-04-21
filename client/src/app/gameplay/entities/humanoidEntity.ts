import { CharacterEntity, CharacterConfig } from './characterEntity';
import { Armor } from '../items/armor';
import { EntityRendererService } from 'src/app/gameServices/entity-renderer.service';
import { ArmorType } from '../items/itemEnums';
import { Weapon } from '../items/weapon';

export class HumanoidEntity extends CharacterEntity {
  private helmet: Armor = null;
  private bodyArmor: Armor = null;
  private boots: Armor = null;
  private weapon: Weapon = null;

  constructor(cfg: HumanoidConfig) {
    super(cfg);

    this.helmet = cfg.helmet;
    this.bodyArmor = cfg.bodyArmor;
    this.boots = cfg.boots;
    this.weapon = cfg.weapon;

    this.refreshRenderSprite();
  }

  public getEquipment() {
    return {
      helmet: this.helmet,
      bodyArmor: this.bodyArmor,
      boots: this.boots,
      weapon: this.weapon,
    };
  }

  public equipArmor(armor: Armor) {
    if (!armor) {
      return;
    }

    switch (armor.armorType) {
      case ArmorType.Helmet:
        this.helmet = armor;
        break;
      case ArmorType.Chestplate:
        this.bodyArmor = armor;
        break;
      case ArmorType.Boots:
        this.boots = armor;
        break;
      default:
        const unhandledArmorType: never = armor.armorType;
        throw new Error(`Unhandled armor type detected: ${unhandledArmorType}`);
    }

    this.refreshRenderSprite();
  }

  public equipWeapon(weapon: Weapon) {
    this.weapon = weapon;

    this.refreshRenderSprite();
  }

  public update() {
    super.update();
  }

  protected lookRight(condition: boolean) {
    super.lookRight(condition);
  }

  protected refreshRenderSprite() {
    super.refreshRenderSprite();

    if (this.bodyArmor) {
      EntityRendererService.drawArmorItem(this.bodyArmor.texture, this.gameObject);
    }

    if (this.boots) {
      EntityRendererService.drawArmorItem(this.boots.texture, this.gameObject);
    }

    if (this.helmet) {
      EntityRendererService.drawArmorItem(this.helmet.texture, this.gameObject);
    }

    if (this.weapon) {
      EntityRendererService.drawArmorItem(this.weapon.texture, this.gameObject);
    }
  }
}

export interface HumanoidConfig extends CharacterConfig {
  helmet?: Armor;
  bodyArmor?: Armor;
  boots?: Armor;
  weapon?: Weapon;
}
