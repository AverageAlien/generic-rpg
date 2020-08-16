import { FactionsAreFriendly } from '../../../core/factions';
export class StupidStalkerController {
    constructor(myself, levelScene, aggroRadius = 256, unaggroRadius = aggroRadius, minRange = 64) {
        this.myself = myself;
        this.levelScene = levelScene;
        this.aggroRadius = aggroRadius;
        this.unaggroRadius = unaggroRadius;
        this.minRange = minRange;
        this.target = null;
    }
    get movement() {
        if (!this.target) {
            const searched = this.searchTarget();
            if (!searched) {
                return Phaser.Math.Vector2.ZERO;
            }
            else {
                this.target = searched;
            }
        }
        const distanceSq = this.myself.gameObject.body.position.distanceSq(this.target.gameObject.body.position);
        if (distanceSq > this.unaggroRadius * this.unaggroRadius) {
            this.target = null;
            return Phaser.Math.Vector2.ZERO;
        }
        else if (distanceSq < this.minRange) {
            return Phaser.Math.Vector2.ZERO;
        }
        const moveVector = new Phaser.Math.Vector2(this.target.gameObject.body.position)
            .subtract(this.myself.gameObject.body.position).normalize();
        return moveVector;
    }
    get attack() {
        return null;
    }
    searchTarget() {
        const myNumber = this.levelScene.entities.indexOf(this.myself);
        if (myNumber < 0) {
            throw new Error('I am not on the entities list!');
        }
        const target = this.levelScene.physics.closest(this.myself.gameObject.body.position, this.levelScene.entities
            .filter((e, i) => !FactionsAreFriendly(this.myself.faction, e.faction) &&
            e.gameObject.body.position.distanceSq(this.myself.gameObject.body.position) < this.aggroRadius * this.aggroRadius &&
            (myNumber !== i))
            .map(e => e.gameObject));
        if (!target) {
            return null;
        }
        const targetEntity = this.levelScene.entities.find(e => e.gameObject === target);
        if (!targetEntity) {
            throw new Error('Entity for closest GameObject not found!');
        }
        return targetEntity;
    }
}
//# sourceMappingURL=stupidStalkerController.js.map