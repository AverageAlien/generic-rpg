"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityHeader = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class EntityHeader extends Phaser.GameObjects.DOMElement {
    constructor(scene, target, alwaysVisible = true) {
        super(scene, target.gameObject.body.position.x, target.gameObject.body.position.y, 'div');
        this.target = target;
        this.alwaysVisible = alwaysVisible;
        this.setHTML(EntityHeader.elementHTML);
        const nameLabel = this.getChildByID('name');
        const levelLabel = this.getChildByID('level');
        nameLabel.innerText = target.entityName;
        levelLabel.innerText = target.level.toString();
        this.updateSize();
        this.setDepth(target.gameObject.depth + 1);
        scene.add.existing(this);
        if (!alwaysVisible) {
            this.setVisible(false);
            target.gameObject.setInteractive();
            rxjs_1.fromEvent(target.gameObject, 'pointerover')
                .pipe(operators_1.takeUntil(target.destroyed))
                .subscribe(() => {
                this.setVisible(true);
            });
            rxjs_1.fromEvent(target.gameObject, 'pointerout')
                .pipe(operators_1.takeUntil(target.destroyed))
                .subscribe(() => {
                this.setVisible(false);
            });
        }
    }
    update(time, delta) {
        super.update(time, delta);
        const bounds = this.target.gameObject.getTopCenter();
        this.setPosition(bounds.x, bounds.y - 12);
    }
}
exports.EntityHeader = EntityHeader;
EntityHeader.elementHTML = `
    <div style='
      color: white;
      font-size: 14px;
      user-select: none;
      width: fit-content;
    '>
      [<span id='level'></span>] <span id='name'></span>
    </div>
  `;
