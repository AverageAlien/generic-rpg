import { Constants } from '../../../../core/constants';
import { LevelScene } from '../../../../core/levelScene';
import { HumanoidEntity } from '../../entities/humanoidEntity';
import { MachineState } from '../machineInfrastructure/machineStates';
import { SituationContext } from '../machineInfrastructure/situationContext.model';
import { StateMachineController } from '../stateMachineController';

export abstract class BaseState {
  protected rushDistanceSq = Math.pow(Math.min(Constants.Level.GRID_SIZE_Y, Constants.Level.GRID_SIZE_X), 2);
  protected unrushDistanceSq = Math.pow(Math.min(Constants.Level.GRID_SIZE_Y, Constants.Level.GRID_SIZE_X) * 2, 2);

  private retreatHealthThreshold = 0.3;
  private retreatAllyCountThreshold = 3;

  constructor(
    protected myself: HumanoidEntity,
    protected controller: StateMachineController,
    protected levelScene: LevelScene,
    protected sightRange: () => number
  ) {}

  public abstract movement(): Phaser.Math.Vector2;
  public abstract attack(): Phaser.Math.Vector2;
  public abstract transitionState(ctx: SituationContext): BaseState;
  public abstract currentState(): MachineState;

  protected isNoTarget(ctx: SituationContext) {
    return !ctx.target?.entity?.gameObject?.body;
  }

  protected shouldRetreat(ctx: SituationContext) {
    return ctx.nearbyAllies.length < this.retreatAllyCountThreshold
      && this.myself.health / this.myself.maxHealth < this.retreatHealthThreshold;
  }
}