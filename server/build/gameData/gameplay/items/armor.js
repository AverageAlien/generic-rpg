import { EquipmentItem } from './equipmentItem';
export class Armor extends EquipmentItem {
    constructor(cfg) {
        super(cfg.name, cfg.texture, cfg.description || 'No information.', cfg.price || 0, cfg.mass || 0, cfg.level || 1);
        this.texture = cfg.texture;
    }
}
//# sourceMappingURL=armor.js.map