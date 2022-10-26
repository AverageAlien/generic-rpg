import { Controller } from '../../gameplay/controllers/baseController';
import { NeuralNetClassifierStateMachineController } from '../../gameplay/controllers/neuralNetClassifierSMController';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity';
import { NetworkLevel } from '../networkLevel';
import { AIControllerFactory } from './aiControllerFactory';

export class NeuralNetworkControllerFactory implements AIControllerFactory {
  get controllerName() {
    return 'Neural Network';
  }

  createController(entity: HumanoidEntity, levelScene: NetworkLevel, sightRange?: number): Controller {
    return new NeuralNetClassifierStateMachineController(entity, levelScene, sightRange);
  }
}