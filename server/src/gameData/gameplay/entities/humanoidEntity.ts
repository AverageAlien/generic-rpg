import { CharacterEntity, CharacterConfig } from './characterEntity';
import { Armor } from '../items/armor';

export class HumanoidEntity extends CharacterEntity {
  public armor: Armor = null;
  private weapon: string = null;

  constructor(cfg: HumanoidConfig) {
    super(cfg);

    this.equipArmor(cfg.armor);
    this.weapon = cfg.weapon;
  }

  public equipArmor(armor: Armor) {
    this.armor = armor;

    this.refreshRenderSprite();
  }

  public update() {
    super.update();
  }

  protected lookRight(condition: boolean) {
    super.lookRight(condition);
  }

  protected refreshRenderSprite() {
    return; // no drawing on server
    super.refreshRenderSprite();

    if (this.armor) {
      this.gameObject.draw(
        this.armor.texture,
        this.gameObject.width / 2 - 9,
        this.gameObject.height / 2 - 5
      );
    }
  }
}

export interface HumanoidConfig extends CharacterConfig {
  armor?: Armor;
  weapon?: string;
}