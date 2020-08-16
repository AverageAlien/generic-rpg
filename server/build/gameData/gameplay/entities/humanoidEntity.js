import { CharacterEntity } from './characterEntity';
export class HumanoidEntity extends CharacterEntity {
    constructor(cfg) {
        super(cfg);
        this.armor = null;
        this.weapon = null;
        this.equipArmor(cfg.armor);
        this.weapon = cfg.weapon;
    }
    equipArmor(armor) {
        this.armor = armor;
        console.log('equip called');
        this.refreshRenderSprite();
    }
    update() {
        super.update();
    }
    lookRight(condition) {
        super.lookRight(condition);
    }
    refreshRenderSprite() {
        super.refreshRenderSprite();
        if (this.armor) {
            this.gameObject.draw(this.armor.texture, this.gameObject.width / 2 - 9, this.gameObject.height / 2 - 5);
        }
    }
}
//# sourceMappingURL=humanoidEntity.js.map