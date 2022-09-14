import { from, Observable, of } from 'rxjs';
import * as io from 'socket.io';
import { PlayerDataService } from '../../services/playerDataService';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { NetworkLevel } from './networkLevel';
import { BattlePreset20vs20Squares } from './playgroundPresets/BattlePreset20vs20Squares';
import { BattlePreset5v5Linear } from './playgroundPresets/BattlePreset5v5Linear';

export class AIPlaygroundLevel extends NetworkLevel {
  constructor(server: io.Server, playerDataService: PlayerDataService, roomName: string) {
    super(server, playerDataService, roomName);
  }

  // spawnPlayer(_player: GameClient, _playerData: PlayerDataSnapshot) {
  //   return;
  // }

  protected loadLevel(): Observable<boolean> {
    return from([true]);
  }

  protected spawnEntities(): HumanoidEntity[] {
    return new BattlePreset20vs20Squares().generateEntities(this.entitySpawner);
  }
}