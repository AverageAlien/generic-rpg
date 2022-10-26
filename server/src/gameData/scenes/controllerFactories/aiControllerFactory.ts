import { Controller } from '../../gameplay/controllers/baseController';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity';
import { NetworkLevel } from '../networkLevel';

export interface AIControllerFactory {
  controllerName: string;
  createController(entity: HumanoidEntity, levelScene: NetworkLevel, sightRange?: number): Controller;
}