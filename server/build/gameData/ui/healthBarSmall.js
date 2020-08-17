"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthBarSmall = void 0;
class HealthBarSmall extends Phaser.GameObjects.DOMElement {
    constructor(scene, target) {
        super(scene, target.gameObject.body.position.x, target.gameObject.body.position.y, 'div');
        this.target = target;
        this.setHTML(HealthBarSmall.elementHTML);
        this.updateSize();
        this.setDepth(target.gameObject.depth + 1);
        scene.add.existing(this);
    }
    update(time, delta) {
        super.update(time, delta);
        const bounds = this.target.gameObject.getBottomCenter();
        this.setPosition(bounds.x, bounds.y + 4);
        const bar = this.getChildByID('full');
        bar.style.width = `${Math.max(Math.min(100, this.target.health / this.target.maxHealth * 100), 0)}%`;
        this.visible = this.target.health < this.target.maxHealth;
    }
}
exports.HealthBarSmall = HealthBarSmall;
HealthBarSmall.elementHTML = `
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
