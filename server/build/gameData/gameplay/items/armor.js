"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Armor = void 0;
const equipmentItem_1 = require("./equipmentItem");
class Armor extends equipmentItem_1.EquipmentItem {
    constructor(cfg) {
        super(cfg.name, cfg.texture, cfg.description || 'No information.', cfg.price || 0, cfg.mass || 0, cfg.level || 1);
        this.texture = cfg.texture;
    }
}
exports.Armor = Armor;
