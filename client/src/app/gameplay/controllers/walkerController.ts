import { Controller } from './baseController';
import { Level } from 'src/app/scenes/levelScene';
import { CharacterEntity } from '../entities/characterEntity';
import { FactionsAreFriendly } from 'src/app/core/factions';
import { Entity } from '../entities/baseEntity';

export class WalkerController implements Controller {
  private target: Entity = null;
  private refreshFrequency = 1000; // ms
  private tickIncrement = 16.67;

  constructor(
    private myself: CharacterEntity,
    private levelScene: Level,
    public aggroRadius: number = 256,
    public unaggroRadius: number = aggroRadius,
    public minRange: number = 64
  ) {}

  get movement(): Phaser.Math.Vector2 {

    if (!this.target) {
      const searched = this.searchTarget();

      if (!searched) {
        return Phaser.Math.Vector2.ZERO;
      } else {
        this.target = searched;
      }
    }

    const distanceSq = this.myself.gameObject.body.position.distanceSq(this.target.gameObject.body.position);

    if (distanceSq > this.unaggroRadius * this.unaggroRadius) {
      this.target = null;
      return Phaser.Math.Vector2.ZERO;
    } else if (distanceSq < this.minRange) {
      return Phaser.Math.Vector2.ZERO;
    }

    const moveVector = new Phaser.Math.Vector2(this.target.gameObject.body.position)
      .subtract(this.myself.gameObject.body.position).normalize();

    return moveVector;
  }

  get attack(): Phaser.Math.Vector2 {
    return null;
  }

  private searchTarget(): Entity {
    const myNumber = this.levelScene.entities.indexOf(this.myself);
    if (myNumber < 0) { throw Error('I am not on the entities list!'); }

    const target = this.levelScene.physics.closest(
      this.myself.gameObject.body.position,
      this.levelScene.entities
        .filter((e, i) => !FactionsAreFriendly(this.myself.faction, e.faction) &&
          e.gameObject.body.position.distanceSq(this.myself.gameObject.body.position) < this.aggroRadius * this.aggroRadius &&
          (myNumber !== i))
        .map(e => e.gameObject)
    ) as Phaser.GameObjects.GameObject;

    if (!target) {
      return null;
    }

    const targetEntity = this.levelScene.entities.find(e => e.gameObject === target);

    if (!targetEntity) { throw Error('Entity for closest GameObject not found!'); }

    return targetEntity;
  }
}
