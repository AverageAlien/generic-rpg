"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HumanoidEntity = void 0;
const characterEntity_1 = require("./characterEntity");
class HumanoidEntity extends characterEntity_1.CharacterEntity {
    constructor(cfg) {
        super(cfg);
        this.armor = null;
        this.weapon = null;
        this.equipArmor(cfg.armor);
        this.weapon = cfg.weapon;
    }
    equipArmor(armor) {
        this.armor = armor;
        this.refreshRenderSprite();
    }
    update() {
        super.update();
    }
    lookRight(condition) {
        super.lookRight(condition);
    }
    refreshRenderSprite() {
        return; // no drawing on server
        super.refreshRenderSprite();
        if (this.armor) {
            this.gameObject.draw(this.armor.texture, this.gameObject.width / 2 - 9, this.gameObject.height / 2 - 5);
        }
    }
}
exports.HumanoidEntity = HumanoidEntity;
