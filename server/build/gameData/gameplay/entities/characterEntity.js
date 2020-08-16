import { Subject } from 'rxjs';
import { Constants } from '../../../core/constants';
import { Faction } from '../../../core/factions';
export class CharacterEntity {
    constructor(cfg) {
        this.faction = Faction.Player;
        this.destroyed$ = new Subject();
        this.entityName = cfg.name;
        this.gameObject = cfg.gameObject;
        this.bodyTexture = cfg.bodyTexture;
        this.maxHealth = cfg.maxHealth || 100;
        this.health = this.maxHealth;
        this.level = cfg.level || 1;
        this.speed = cfg.speed || 20;
        this.refreshRenderSprite();
    }
    get destroyed() {
        return this.destroyed$.asObservable();
    }
    update() {
        this.move();
    }
    damage(dmg) {
        this.health -= dmg;
        if (this.health <= 0) {
            this.destroy();
        }
    }
    destroy() {
        this.gameObject.destroy();
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    move() {
        const maxSpeedMult = Constants.Character.MAX_SPEED_MULT;
        const movement = this.controller.movement.scale(this.speed * maxSpeedMult * 10);
        if (this.gameObject.body.velocity.lengthSq() > (this.speed * this.speed * maxSpeedMult * maxSpeedMult)) {
            this.gameObject.body.velocity.normalize().scale(this.speed * maxSpeedMult);
        }
        if (movement.x !== 0) {
            this.lookRight(movement.x > 0);
        }
        this.gameObject.body.setAcceleration(movement.x, movement.y);
    }
    lookRight(condition) {
        this.gameObject.setFlipX(condition);
    }
    refreshRenderSprite() {
        const bounds = this.gameObject.body.center;
        this.gameObject.clear();
        this.gameObject.draw(this.bodyTexture, 0, 0);
    }
}
//# sourceMappingURL=characterEntity.js.map