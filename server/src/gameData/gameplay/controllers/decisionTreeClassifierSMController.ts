import { LevelScene } from '../../../core/levelScene';
import { HumanoidEntity } from '../entities/humanoidEntity';
import { DecisionTreeClassification } from './machineInfrastructure/decisionTreeClassification';
import { SituationContext } from './machineInfrastructure/situationContext.model';
import { StateMachineController } from './stateMachineController';

export class DecisionTreeClassifierStateMachineController extends StateMachineController {
  constructor(
    myself: HumanoidEntity,
    levelScene: LevelScene,
    aggroRadius: number = 512
  ) {
    super(myself, levelScene, aggroRadius);
  }

  protected transitionState(ctx: SituationContext) {
    const prevState = this.state.currentState();
    const nextStateType = DecisionTreeClassification.predictState(prevState, ctx);

    if (prevState === nextStateType) {
      return;
    }

    const nextState = this.createMachineState(nextStateType);

    this.state = nextState;
  }
}