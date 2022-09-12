import { from, Observable, of } from 'rxjs';
import * as io from 'socket.io';
import { PlayerDataService } from '../../services/playerDataService';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { NetworkLevel } from './networkLevel';

export class AIPlaygroundLevel extends NetworkLevel {
  constructor(server: io.Server, playerDataService: PlayerDataService, roomName: string) {
    super(server, playerDataService, roomName);
  }

  protected loadLevel(): Observable<boolean> {
    console.log('STUB STUB STUB LOADLEVEL');

    return from([true]);
  }

  protected spawnEntities(): HumanoidEntity[] {
    // add tested enemies here

    return [];
  }
}