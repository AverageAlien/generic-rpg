import { CharacterEntity } from '../gameplay/entities/characterEntity';
import { ClientLevel } from '../scenes/clientLevel';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class EntityHeader extends Phaser.GameObjects.DOMElement {
  private static readonly elementHTML = `
    <div style='
      color: white;
      font-size: 14px;
      user-select: none;
      width: fit-content;
    '>
      [<span id='level'></span>] <span id='name'></span>
    </div>
  `;

  constructor(scene: ClientLevel, public target: CharacterEntity, public alwaysVisible = true) {
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

    this.updateSize();
    this.setDepth(target.gameObject.depth + 1);

    scene.add.existing(this);

    if (!alwaysVisible) {
      this.setVisible(false);
      target.gameObject.setInteractive();

      fromEvent(target.gameObject, 'pointerover')
        .pipe(takeUntil(target.destroyed))
        .subscribe(() => {
          this.setVisible(true);
        });
      fromEvent(target.gameObject, 'pointerout')
        .pipe(takeUntil(target.destroyed))
        .subscribe(() => {
          this.setVisible(false);
        });
    }
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    const bounds = this.target.gameObject.getTopCenter();
    this.setPosition(
      bounds.x,
      bounds.y - 12
    );
  }
}
