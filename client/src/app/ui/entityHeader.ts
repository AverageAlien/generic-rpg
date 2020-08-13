import { CharacterEntity } from '../gameplay/entities/characterEntity';
import { Level } from '../scenes/levelScene';

export class EntityHeader extends Phaser.GameObjects.DOMElement {
  private static readonly elementHTML = `
    <div style='
      display: flex;
      flex-flow: row nowrap;
      color: white;
      font-size: 14px;
      -webkit-text-stroke: black 1px;
    '>
      [
      <span id='level'></span>
      ] -
      <span id='name'></span>
    </div>
  `;

  constructor(scene: Level, public target: CharacterEntity) {
    super(
      scene,
      target.gameObject.body.position.x,
      target.gameObject.body.position.y,
      'div'
    );
    this.setHTML(EntityHeader.elementHTML);

    const nameLabel = this.getChildByID('name') as HTMLElement;
    const levelLabel = this.getChildByID('level') as HTMLElement;

    nameLabel.innerText = target.entityName;
    levelLabel.innerText = target.level.toString();

    scene.add.existing(this);
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    const bounds = this.target.gameObject.getTopCenter();
    this.setPosition(
      bounds.x,
      bounds.y + 4
    );
  }
}
