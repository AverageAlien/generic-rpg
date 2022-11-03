import * as io from 'socket.io';
import '@geckos.io/phaser-on-nodejs';
import * as Phaser from 'phaser';
import { v4 as UUID } from 'uuid';

import { Constants } from '../core/constants';
import { Room } from '../models/room';
import { AITrainingLevel } from '../gameData/scenes/aiTrainingLevel';
import { DatasetBuilderService } from '../gameData/ai-learning/datasetBuilderService';
import { PlayerDataService } from './playerDataService';
import { GameOverEventArgs } from '../gameData/eventArgs/gameOverEventArgs';
import { StatisticsGathererService } from '../gameData/ai-learning/statsGathererService';
import { DamageDealtEventArgs } from '../gameData/eventArgs/damageDealtEventArgs';
import { FrameStateUpdateEventArgs } from '../gameData/eventArgs/frameStateUpdateEventArgs';
import { InitStatsEventArgs } from '../gameData/eventArgs/initStatsEventArgs';
import { AIPlaygroundLevel } from '../gameData/scenes/aiPlaygroundLevel';
import { AIControllerFactory } from '../gameData/scenes/controllerFactories/aiControllerFactory';
import { AICompareControllersLevel } from '../gameData/scenes/aiCompareControllersLevel';

global.phaserOnNodeFPS = 30;

export class StatisticsCollectorService {
  constructor(
    private server: io.Server,
    private playerDataService: PlayerDataService,
    private teamAController: AIControllerFactory,
    private teamBController: AIControllerFactory) { }

  public collectStatisticsInGames(statsFileName: string, numOfBatches: number, batchSize: number) {
    const statsGatherer = new StatisticsGathererService(statsFileName);

    this.runBatch(statsGatherer, batchSize, numOfBatches);
  }

  private runBatch(statsGatherer: StatisticsGathererService, batchSize: number, batchesLeft: number) {
    if (batchesLeft === 0) {
      statsGatherer.close();
      console.log('STATISTICS RECORDING OVER');
      return;
    }

    console.log(`Begin batch. (${batchesLeft} left) =====================================`);

    const games = [];

    for (let i = 0; i < batchSize; ++i) {
      const room = new Room();
      const roomName = UUID();
      room.roomName = roomName;

      room.location = new AICompareControllersLevel(this.server,
        this.playerDataService,
        roomName,
        this.teamAController,
        this.teamBController);

      const gameConfig = {
        type: Phaser.HEADLESS,
        height: Constants.Screen.SCREEN_H,
        width: Constants.Screen.SCREEN_W,
        scene: [room.location],
        parent: 'gameContainer',
        physics: {
          default: 'arcade',
        },
        dom: {
          createContainer: true,
        },
      };

      room.game = new Phaser.Game(gameConfig);
      this.listenToStatsEvents(room, statsGatherer);
      games.push(room);

      room.game.events.on(GameOverEventArgs.eventName(), ((a: GameOverEventArgs) => {
        room.game.destroy(true, false);
        games.splice(games.indexOf(room), 1);

        console.log(`Battle over in room ${room.roomName}. Team ${a.winningTeam} won. ${ a.timeout ? 'TIMEOUT!' : '' } (${batchSize - games.length} / ${batchSize})`);
        statsGatherer.saveTeamSummary(a, roomName);

        if (games.length === 0) {
          console.log(`Batch complete. (${batchesLeft - 1} left)`);
          this.runBatch(statsGatherer, batchSize, batchesLeft - 1);
        }
      }));
    }
  }

  protected listenToStatsEvents(room: Room, statisticsRecorder?: StatisticsGathererService) {
    room.game.events.on(InitStatsEventArgs.eventName(), ((a: InitStatsEventArgs) => {
      statisticsRecorder?.initTeamStats(a, room.roomName);
    }));

    room.game.events.on(DamageDealtEventArgs.eventName(), ((a: DamageDealtEventArgs) => {
      statisticsRecorder?.recordDamageDealt(a, room.roomName);
    }));

    room.game.events.on(FrameStateUpdateEventArgs.eventName(), ((a: FrameStateUpdateEventArgs) => {
      statisticsRecorder?.recordFrameUpdate(a, room.roomName);
    }));
  }
}