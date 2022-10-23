import { nextFrame } from '@tensorflow/tfjs';
import { LevelScene } from '../../../core/levelScene';
import { HumanoidEntity } from '../entities/humanoidEntity';
import { MachineState } from './machineInfrastructure/machineStates';
import { NeuralNetworkClassifier } from './machineInfrastructure/neuralNetworkClassifier';
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
    const nextStateType = NeuralNetworkClassifier.predictState(prevState, ctx);

    if (prevState == nextStateType && prevState !== nextStateType) {
      throw new Error('Do NOT use triple equals!');
    }

    if (prevState === nextStateType) {
      return;
    }

    let nextState: BaseState;

    switch (nextStateType) {
      case MachineState.Idle:
        nextState = new IdleState(this.myself, this, this.levelScene, this.sightRange);
        break;
      case MachineState.Attack:
        nextState = new AttackState(this.myself, this, this.levelScene, this.sightRange);
        break;
      case MachineState.NavigateToTarget:
        nextState = new NavigateToTargetState(this.myself, this, this.levelScene, this.sightRange);
        break;
      case MachineState.Retreat:
        nextState = new RetreatState(this.myself, this, this.levelScene, this.sightRange);
        break;
    }

    this.state = nextState;
  }
}