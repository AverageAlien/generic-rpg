import { ClientLevel } from '../scenes/clientLevel';
import { CharacterEntity } from '../gameplay/entities/characterEntity';

export class HealthBarSmall extends Phaser.GameObjects.DOMElement {
  private static readonly elementHTML = `
    <div style='
      background-color: red;
      width: 48px;
      height: 2px;
    '>
      <div id='full' style='
        height: 100%;
        width: 100%;
        background-color: lime;
      '>
      </div>
    </div>
  `;

  constructor(scene: ClientLevel, public target: CharacterEntity) {
    super(
      scene,
      target.gameObject.body.position.x,
      target.gameObject.body.position.y,
      'div'
    );
    this.setHTML(HealthBarSmall.elementHTML);

    this.updateSize();
    this.setDepth(target.gameObject.depth + 1);

    scene.add.existing(this);
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    const bounds = this.target.gameObject.getBottomCenter();
    this.setPosition(
      bounds.x,
      bounds.y + 4
    );

    const bar = this.getChildByID('full') as HTMLElement;
    bar.style.width = `${Math.max(Math.min(100, this.target.health / this.target.maxHealth * 100), 0)}%`;

    this.visible = this.target.health < this.target.maxHealth;
  }
}
