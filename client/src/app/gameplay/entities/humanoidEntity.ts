import { CharacterEntity, CharacterConfig } from './characterEntity';
import { Armor } from '../items/armor';
import { EntityRendererService } from 'src/app/gameServices/entity-renderer.service';

export class HumanoidEntity extends CharacterEntity {
  private armor: Armor = null;
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
    super.refreshRenderSprite();

    if (this.armor) {
      EntityRendererService.drawArmorItem(this.armor.texture, this.gameObject);
    }
  }
}

export interface HumanoidConfig extends CharacterConfig {
  armor?: Armor;
  weapon?: string;
}
