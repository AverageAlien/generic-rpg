import * as io from 'socket.io';
import { PlayerDataService } from '../../services/playerDataService';
import { AIPlaygroundLevel } from './aiPlaygroundLevel';
import { AIControllerFactory } from './controllerFactories/aiControllerFactory';

export class AICompareControllersLevel extends AIPlaygroundLevel {
  constructor(
    server: io.Server,
    playerDataService: PlayerDataService,
    roomName: string,
    private teamAController: AIControllerFactory,
    private teamBController: AIControllerFactory) {
    super(server, playerDataService, roomName);
  }

  protected getTeamsControllers(): [AIControllerFactory, AIControllerFactory] {
    return [this.teamAController, this.teamBController];
  }
}