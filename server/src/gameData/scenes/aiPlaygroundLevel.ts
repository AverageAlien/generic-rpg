import * as tf from '@tensorflow/tfjs-node';
import * as io from 'socket.io';
import { from, Observable, of } from 'rxjs';
import { PlayerDataService } from '../../services/playerDataService';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { NetworkLevel } from './networkLevel';
import { BattlePreset20vs20Squares } from './playgroundPresets/BattlePreset20vs20Squares';
import { BattlePreset5v5Linear } from './playgroundPresets/BattlePreset5v5Linear';
import { BattlePreset5Baddies } from './playgroundPresets/BattlePreset5Baddies';

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
    const preset = new BattlePreset5v5Linear();
    preset.addPositionOffset = (pos) => new Phaser.Math.Vector2(pos.x + 2 * (Math.random() - 0.5), pos.y + 2 * (Math.random() - 0.5));

    return preset.generateEntities(this.entitySpawner);
  }
}