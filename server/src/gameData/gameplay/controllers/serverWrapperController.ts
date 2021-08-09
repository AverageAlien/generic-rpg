import { performance } from 'perf_hooks';
import { BehaviorSubject } from 'rxjs';
import { WeaponService } from '../../../services/weaponService';
import { NetworkLevel } from '../../scenes/networkLevel';
import { Controllable } from '../entities/baseEntity';
import { HumanoidEntity } from '../entities/humanoidEntity';
import { Controller } from './baseController';

export class ServerWrapperController implements Controller {
  private movementChanged$ = new BehaviorSubject<Phaser.Math.Vector2>(Phaser.Math.Vector2.ZERO);
  private readyForAttack = true;

  private readonly movementUpdateTimeout = 250; // ms
  private lastMovementUpdate = 0;

  constructor(private levelScene: NetworkLevel, private internalController: Controller, public controlledEntity: Controllable) {}

  get movement(): Phaser.Math.Vector2 {
    const movt = this.internalController.movement;
    const now = performance.now();

    if (now - this.lastMovementUpdate > this.movementUpdateTimeout) {
      if (movt.distanceSq(this.movementChanged$.value) > 0.001) {
        this.movementChanged$.next(movt);
      }

      this.lastMovementUpdate = now;
    }

    return movt;
  }

  get attack(): Phaser.Math.Vector2 {
    return null;
  }

  get movementChanged() {
    return this.movementChanged$.asObservable();
  }

  public processAttack() {
    // this method assumes that the controlled entity is an instance of HumanoidEntity and has a weapon
    // the check for these conditions is skipped here for performance reasons
    if (!this.readyForAttack) {
      return;
    }
    const myself = this.controlledEntity as HumanoidEntity;
    const target = this.internalController.attack;

    if (!target) {
      return;
    }

    this.readyForAttack = false;

    console.log('PROCESSING ATTACK FOR ' + this.controlledEntity.entityName);

    this.levelScene.weaponService.attackNetwork(myself, target);

    setTimeout(() => this.readyForAttack = true, myself.getEquipment().weapon.refire);
  }
}