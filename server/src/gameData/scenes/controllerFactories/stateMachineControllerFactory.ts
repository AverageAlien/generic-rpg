import { Controller } from "../../gameplay/controllers/baseController";
import { StateMachineController } from "../../gameplay/controllers/stateMachineController";
import { HumanoidEntity } from "../../gameplay/entities/humanoidEntity";
import { NetworkLevel } from '../networkLevel';
import { AIControllerFactory } from './aiControllerFactory';

export class StateMachineControllerFactory implements AIControllerFactory {
  get controllerName() {
    return 'State Machine';
  }

  createController(entity: HumanoidEntity, levelScene: NetworkLevel, sightRange?: number): Controller {
    return new StateMachineController(entity, levelScene, sightRange);
  }
}