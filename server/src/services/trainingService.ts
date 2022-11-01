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

global.phaserOnNodeFPS = 30;

export class TrainingService {
  constructor(private server: io.Server, private playerDataService: PlayerDataService) {

  }

  public runGamesForDatasetGeneration(datasetName: string, numOfGames: number) {
    const games = [];
    const datasetBuilder = new DatasetBuilderService(datasetName);

    for (let i = 0; i < numOfGames; ++i) {
      const room = new Room();
      const roomName = UUID();
      room.roomName = roomName;
      room.location = new AITrainingLevel(this.server, this.playerDataService, roomName, datasetBuilder);

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

      games.push(room);

      room.game.events.on(GameOverEventArgs.eventName(), ((a: GameOverEventArgs) => {
        room.game.destroy(true, true);
        games.splice(games.indexOf(room), 1);
        // tslint:disable-next-line: max-line-length
        console.log(`Training complete for room ${roomName}. Winning team: ${a.winningTeam}. (${numOfGames - games.length} / ${numOfGames})`);

        if (games.length === 0) {
          console.log('TRAINING OVER');
          datasetBuilder.close();
        }
      }));
    }
  }
}