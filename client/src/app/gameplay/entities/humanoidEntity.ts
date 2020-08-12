import { CharacterEntity } from './characterEntity';
import { Armor } from '../items/armor';
import { GameObjects } from 'phaser';

export class HumanoidEntity extends CharacterEntity {
  private armor: Armor = null;
  private armorSprite: GameObjects.Sprite;
  private weapon: string = null;

  constructor(cfg: HumanoidConfig) {
    super(
      cfg.name,
      cfg.gameObject,
      cfg.maxHealth || 100,
      cfg.level || 1,
      cfg.speed || 20
    );
    this.armorSprite = cfg.armorSprite;

    this.equipArmor(cfg.armor);
    this.weapon = cfg.weapon;
  }

  public equipArmor(armor: Armor) {
    this.armor = armor;
    console.log('equip called');

    if (armor) {
      this.armorSprite.setTexture(armor.texture);
      console.log(armor.texture);
    }

    this.armorSprite.setVisible(!!armor);
  }

  public update() {
    super.update();

    this.armorSprite.setPosition(
      this.gameObject.body.center.x,
      this.gameObject.body.center.y - 0.5
    );
  }

  protected lookRight(condition: boolean) {
    super.lookRight(condition);

    this.armorSprite.setFlipX(condition);
  }
}

interface HumanoidConfig {
  name: string;
  gameObject: Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body };
  armorSprite: Phaser.GameObjects.Sprite;
  maxHealth?: number;
  level?: number;
  speed?: number;
  armor?: Armor;
  weapon?: string;
}
