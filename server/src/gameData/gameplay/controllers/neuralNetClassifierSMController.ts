import { nextFrame } from '@tensorflow/tfjs';
import { LevelScene } from '../../../core/levelScene';
import { HumanoidEntity } from '../entities/humanoidEntity';
import { MachineState } from './machineInfrastructure/machineStates';
import { NeuralNetworkClassification } from './machineInfrastructure/neuralNetworkClassification';
import { SituationContext } from './machineInfrastructure/situationContext.model';
import { AttackState } from './machineStates/attackState';
import { BaseState } from './machineStates/baseState';
import { IdleState } from './machineStates/idleState';
import { NavigateToTargetState } from './machineStates/navigateToTargetState';
import { RetreatState } from './machineStates/retreatState';
import { StateMachineController } from './stateMachineController';

export class NeuralNetClassifierStateMachineController extends StateMachineController {
  constructor(
    myself: HumanoidEntity,
    levelScene: LevelScene,
    aggroRadius: number = 512
  ) {
    super(myself, levelScene, aggroRadius);
  }

  protected transitionState(ctx: SituationContext) {
    const prevState = this.state.currentState();
    const nextStateType = NeuralNetworkClassification.predictState(prevState, ctx);

    if (prevState === nextStateType) {
      return;
    }

    const nextState = this.createMachineState(nextStateType);

    this.state = nextState;
  }
}