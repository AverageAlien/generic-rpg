import { Controller } from '../../gameplay/controllers/baseController';
import { DecisionTreeClassifierStateMachineController } from '../../gameplay/controllers/decisionTreeClassifierSMController';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity';
import { NetworkLevel } from '../networkLevel';
import { AIControllerFactory } from './aiControllerFactory';

export class DecisionTreeControllerFactory implements AIControllerFactory {
  get controllerName() {
    return 'Decision Tree';
  }

  createController(entity: HumanoidEntity, levelScene: NetworkLevel, sightRange?: number): Controller {
    return new DecisionTreeClassifierStateMachineController(entity, levelScene, sightRange);
  }
}