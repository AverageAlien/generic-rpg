import { Constants } from '../../../core/constants';
import { FactionsAreFriendly } from '../../../core/factions';
import { LevelScene } from '../../../core/levelScene';
import { DatasetBuilderService } from '../../ai-learning/datasetBuilderService';
import { DatasetRowAggregator } from '../../ai-learning/datasetRowAggregator';
import { FrameStateUpdateEventArgs } from '../../eventArgs/frameStateUpdateEventArgs';
import { AIPlaygroundLevel } from '../../scenes/aiPlaygroundLevel';
import { CharacterEntity } from '../entities/characterEntity';
import { HumanoidEntity } from '../entities/humanoidEntity';
import { Controller } from './baseController';
import { MachineState } from './machineInfrastructure/machineStates';
import { HumanoidNearby, SituationContext } from './machineInfrastructure/situationContext.model';
import { AttackState } from './machineStates/attackState';
import { BaseState } from './machineStates/baseState';
import { IdleState } from './machineStates/idleState';
import { NavigateToTargetState } from './machineStates/navigateToTargetState';
import { RetreatState } from './machineStates/retreatState';

export class StateMachineController implements Controller {
  protected state: BaseState;
  public target: HumanoidEntity;

  private datasetWriter: DatasetBuilderService;

  private rushDistanceSq = Math.pow(Math.min(Constants.Level.GRID_SIZE_Y, Constants.Level.GRID_SIZE_X), 2);
  private unrushDistanceSq = Math.pow(Math.min(Constants.Level.GRID_SIZE_Y, Constants.Level.GRID_SIZE_X) * 2, 2);

  constructor(
    protected myself: HumanoidEntity,
    protected levelScene: LevelScene,
    private aggroRadius: number = 512
  ) {
    this.state = new IdleState(myself, this, levelScene, this.sightRange);

    this.datasetWriter = (levelScene as AIPlaygroundLevel).dataSetWriter;
  }

  get movement(): Phaser.Math.Vector2 {
    this.reconsiderState(this.assembleSituationContext());

    return this.state.movement();
  }

  get attack(): Phaser.Math.Vector2 {
    return this.state.attack();
  }

  protected sightRange() {
    return this.aggroRadius;
  }

  private assembleSituationContext(): SituationContext {
    const equipment = this.myself.getEquipment();
    const armor =
      (equipment.helmet?.armor || 0)
      + (equipment.bodyArmor?.armor || 0)
      + (equipment.boots?.armor || 0);

    const humanoids = this.findNearbyHumanoids();

    return {
      maxHealth: this.myself.maxHealth,
      health: this.myself.health,
      speed: this.myself.speed,
      armor,
      weaponCtx: {
        damage: equipment.weapon?.damage.map(d => d.value).reduce((a, b) => a + b) || 0,
        reach: equipment.weapon?.reach || 0,
        refire: equipment.weapon?.refire || 0,
        swing: equipment.weapon?.swing || 0
      },
      nearbyAllies: humanoids.filter(h => FactionsAreFriendly(h.entity.faction, this.myself.faction) === true),
      nearbyEnemies: humanoids.filter(h => FactionsAreFriendly(h.entity.faction, this.myself.faction) === false),
      target: !!this.target?.gameObject?.body
        ? { entity: this.target, distanceSq: this.target.pos.distanceSq(this.myself.pos) }
        : null
    }
  }

  private findNearbyHumanoids(): HumanoidNearby[] {
    const nearbyHumanoids: HumanoidNearby[] = [];

    this.levelScene.entities.forEach(entity => {
      if (entity === this.myself || !(entity instanceof HumanoidEntity) || entity.health <= 0) {
        return;
      }

      const distanceSq = entity.gameObject.body.position.distanceSq(this.myself.gameObject.body.position);

      if (distanceSq < this.aggroRadius ** 2) {
        nearbyHumanoids.push({ entity, distanceSq })
      }
    });

    return nearbyHumanoids;
  }

  protected reconsiderState(ctx: SituationContext) {
    let updatedTarget: HumanoidNearby;

    if (!!this.target && !this.target?.gameObject?.body) {
      this.target = null;

      if (!(this.state instanceof IdleState)) {
        this.state = this.createMachineState(MachineState.Idle);
      }
    }

    if (this.state instanceof IdleState && !this.target) {
      const enemiesLocated = ctx.nearbyEnemies.length > 0;

      if (enemiesLocated === false) {
        return;
      }

      updatedTarget = ctx.nearbyEnemies.reduce((prev, curr) => prev.distanceSq < curr.distanceSq ? prev : curr);
      this.target = updatedTarget.entity;
    }

    const targetDistance = updatedTarget?.distanceSq
      || this.target.gameObject.body.position.distanceSq(this.myself.gameObject.body.position);

    if (targetDistance > (this.aggroRadius ** 2) * Math.SQRT2) {
      this.target = null;
      this.state = this.createMachineState(MachineState.Idle);
      return;
    }

    this.transitionState(ctx);

    const currentState = this.state.currentState();
    this.levelScene.game.events.emit(FrameStateUpdateEventArgs.eventName(), new FrameStateUpdateEventArgs({
      faction: this.myself.faction,
      currentState
    }))
  }

  protected transitionState(ctx: SituationContext) {
    const nextState = this.state.transitionState(ctx);

    if (!!this.datasetWriter) {
      const datasetRow = DatasetRowAggregator.MakeDatasetRow(
        !!nextState ? nextState.currentState() : this.state.currentState(),
        this.state.currentState(),
        ctx);

      this.datasetWriter.addRow(datasetRow);
    }

    if (!!nextState) {
      this.state = nextState;
    }
  }

  protected createMachineState(machineState: MachineState): BaseState {
    switch (machineState) {
      case MachineState.Idle:
        return new IdleState(this.myself, this, this.levelScene, this.sightRange);
      case MachineState.Attack:
        return new AttackState(this.myself, this, this.levelScene, this.sightRange);
      case MachineState.NavigateToTarget:
        return new NavigateToTargetState(this.myself, this, this.levelScene, this.sightRange);
      case MachineState.Retreat:
        return new RetreatState(this.myself, this, this.levelScene, this.sightRange);
    }
  }
}