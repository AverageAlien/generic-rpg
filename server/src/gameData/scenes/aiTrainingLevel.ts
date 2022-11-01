import * as io from 'socket.io';
import { Faction } from '../../core/factions';
import { GameClient } from '../../models/gameClient';
import { PlayerDataSnapshot } from '../../models/userDataSnapshot';
import { NetworkEntitySpawner } from '../../services/networkEntitySpawner';
import { PlayerDataService } from '../../services/playerDataService';
import { DatasetBuilderService } from '../ai-learning/datasetBuilderService';
import { GameOverEventArgs } from '../eventArgs/gameOverEventArgs';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { AIPlaygroundLevel } from './aiPlaygroundLevel';
import { BaseBattlePreset } from './playgroundPresets/BaseBattlePreset';
import { BattlePreset4v4v4 } from './playgroundPresets/BattlePreset4v4v4';
import { BattlePreset5v5Linear } from './playgroundPresets/BattlePreset5v5Linear';
import { BattlePresetNvNLinear } from './playgroundPresets/BattlePresetNvNLinear';
import { BattlePresetStickVsSword } from './playgroundPresets/BattlePresetStickVsSword';

export class AITrainingLevel extends AIPlaygroundLevel {
  constructor(server: io.Server, playerDataService: PlayerDataService, roomName: string, datasetWriter: DatasetBuilderService) {
    super(server, playerDataService, roomName);

    this.dataSetWriter = datasetWriter;
  }

  // spawnPlayer(_player: GameClient, _playerData: PlayerDataSnapshot) {
  //   return;
  // }

  protected spawnEntities(): HumanoidEntity[] {
    const preset = this.getRandomPreset(this.entitySpawner);
    preset.addPositionOffset = (pos) => new Phaser.Math.Vector2(pos.x + 2 * (Math.random() - 0.5), pos.y + 2 * (Math.random() - 0.5));

    const entities = preset.generateEntities();

    console.log(`Spawning ${entities.length} entities`);
    this.monitorGameEnding(entities);

    return entities;
  }

  protected getRandomPreset(entitySpawner: NetworkEntitySpawner): BaseBattlePreset {
    const presets: BaseBattlePreset[] = [
      new BattlePresetNvNLinear(1, entitySpawner),
      new BattlePresetNvNLinear(3, entitySpawner),
      new BattlePresetNvNLinear(5, entitySpawner),
      new BattlePresetStickVsSword(entitySpawner),
      new BattlePreset4v4v4(entitySpawner)
    ];

    return presets[Math.floor(Math.random() * presets.length)];
  }
}