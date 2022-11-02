import * as tf from '@tensorflow/tfjs-node';
import * as io from 'socket.io';
import { from, Observable, of } from 'rxjs';
import { PlayerDataService } from '../../services/playerDataService';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { NetworkLevel } from './networkLevel';
import { BattlePreset20vs20Squares } from './playgroundPresets/BattlePreset20vs20Squares';
import { BattlePreset5v5Linear } from './playgroundPresets/BattlePreset5v5Linear';
import { BattlePreset5Baddies } from './playgroundPresets/BattlePreset5Baddies';
import { BattlePreset4v4v4 } from './playgroundPresets/BattlePreset4v4v4';
import { DatasetBuilderService } from '../ai-learning/datasetBuilderService';
import { PlayerDataSnapshot } from '../../models/userDataSnapshot';
import { GameClient } from '../../models/gameClient';
import { BattlePresetNvNLinear } from './playgroundPresets/BattlePresetNvNLinear';
import { BattlePresetControllersComptetition } from './playgroundPresets/BattlePresetControllersCompetition';
import { StateMachineControllerFactory } from './controllerFactories/stateMachineControllerFactory';
import { DecisionTreeControllerFactory } from './controllerFactories/decisionTreeControllerFactory';
import { NeuralNetworkControllerFactory } from './controllerFactories/neuralNetworkControllerFactory';
import { Faction } from '../../core/factions';
import { GameOverEventArgs } from '../eventArgs/gameOverEventArgs';
import { InitStatsEventArgs } from '../eventArgs/initStatsEventArgs';
import { AIControllerFactory } from './controllerFactories/aiControllerFactory';

const gameOverTimeout = 60;

export class AIPlaygroundLevel extends NetworkLevel {
  public dataSetWriter: DatasetBuilderService;

  constructor(server: io.Server, playerDataService: PlayerDataService, roomName: string) {
    super(server, playerDataService, roomName);
  }

  protected loadLevel(): Observable<boolean> {
    this.levelLoader.importlevel(`{"l":[[0,[[12,0,2],[12,1,2],[12,2,2],[12,3,2],[12,4,2],[12,5,2],[12,6,2],[12,7,2],[12,8,2],[12,9,2],[12,10,2],[12,11,2],[0,12,2],[1,12,2],[2,12,2],[3,12,2],[4,12,2],[5,12,2],[6,12,2],[7,12,2],[8,12,2],[9,12,2],[10,12,2],[11,12,2],[12,12,2],[0,-12,2],[1,-12,2],[2,-12,2],[3,-12,2],[4,-12,2],[5,-12,2],[6,-12,2],[7,-12,2],[8,-12,2],[9,-12,2],[10,-12,2],[11,-12,2],[12,-12,2],[12,-11,2],[12,-10,2],[12,-9,2],[12,-8,2],[12,-7,2],[12,-6,2],[12,-5,2],[12,-4,2],[12,-3,2],[12,-2,2],[12,-1,2],[-13,0,2],[-13,1,2],[-13,2,2],[-13,3,2],[-13,4,2],[-13,5,2],[-13,6,2],[-13,7,2],[-13,8,2],[-13,9,2],[-13,10,2],[-13,11,2],[-13,12,2],[-12,12,2],[-11,12,2],[-10,12,2],[-9,12,2],[-8,12,2],[-7,12,2],[-6,12,2],[-5,12,2],[-4,12,2],[-3,12,2],[-2,12,2],[-1,12,2],[-13,-12,2],[-12,-12,2],[-11,-12,2],[-10,-12,2],[-9,-12,2],[-8,-12,2],[-7,-12,2],[-6,-12,2],[-5,-12,2],[-4,-12,2],[-3,-12,2],[-2,-12,2],[-1,-12,2],[-13,-11,2],[-13,-10,2],[-13,-9,2],[-13,-8,2],[-13,-7,2],[-13,-6,2],[-13,-5,2],[-13,-4,2],[-13,-3,2],[-13,-2,2],[-13,-1,2]]],[-1,[[0,0,3],[1,0,3],[2,0,3],[3,0,3],[4,0,3],[5,0,3],[6,0,3],[7,0,3],[8,0,3],[9,0,3],[10,0,3],[11,0,3],[0,1,3],[1,1,3],[2,1,3],[3,1,3],[4,1,3],[5,1,3],[6,1,3],[7,1,3],[8,1,3],[9,1,3],[10,1,3],[11,1,3],[0,2,3],[1,2,3],[2,2,3],[3,2,3],[4,2,3],[5,2,3],[6,2,3],[7,2,3],[8,2,3],[9,2,3],[10,2,3],[11,2,3],[0,3,3],[1,3,3],[2,3,3],[3,3,3],[4,3,3],[5,3,3],[6,3,3],[7,3,3],[8,3,3],[9,3,3],[10,3,3],[11,3,3],[0,4,3],[1,4,3],[2,4,3],[3,4,3],[4,4,3],[5,4,3],[6,4,3],[7,4,3],[8,4,3],[9,4,3],[10,4,3],[11,4,3],[0,5,3],[1,5,3],[2,5,3],[3,5,3],[4,5,3],[5,5,3],[6,5,3],[7,5,3],[8,5,3],[9,5,3],[10,5,3],[11,5,3],[0,6,3],[1,6,3],[2,6,3],[3,6,3],[4,6,3],[5,6,3],[6,6,3],[7,6,3],[8,6,3],[9,6,3],[10,6,3],[11,6,3],[0,7,3],[1,7,3],[2,7,3],[3,7,3],[4,7,3],[5,7,3],[6,7,3],[7,7,3],[8,7,3],[9,7,3],[10,7,3],[11,7,3],[0,8,3],[1,8,3],[2,8,3],[3,8,3],[4,8,3],[5,8,3],[6,8,3],[7,8,3],[8,8,3],[9,8,3],[10,8,3],[11,8,3],[0,9,3],[1,9,3],[2,9,3],[3,9,3],[4,9,3],[5,9,3],[6,9,3],[7,9,3],[8,9,3],[9,9,3],[10,9,3],[11,9,3],[0,10,3],[1,10,3],[2,10,3],[3,10,3],[4,10,3],[5,10,3],[6,10,3],[7,10,3],[8,10,3],[9,10,3],[10,10,3],[11,10,3],[0,11,3],[1,11,3],[2,11,3],[3,11,3],[4,11,3],[5,11,3],[6,11,3],[7,11,3],[8,11,3],[9,11,3],[10,11,3],[11,11,3],[0,-11,3],[1,-11,3],[2,-11,3],[3,-11,3],[4,-11,3],[5,-11,3],[6,-11,3],[7,-11,3],[8,-11,3],[9,-11,3],[10,-11,3],[11,-11,3],[0,-10,3],[1,-10,3],[2,-10,3],[3,-10,3],[4,-10,3],[5,-10,3],[6,-10,3],[7,-10,3],[8,-10,3],[9,-10,3],[10,-10,3],[11,-10,3],[0,-9,3],[1,-9,3],[2,-9,3],[3,-9,3],[4,-9,3],[5,-9,3],[6,-9,3],[7,-9,3],[8,-9,3],[9,-9,3],[10,-9,3],[11,-9,3],[0,-8,3],[1,-8,3],[2,-8,3],[3,-8,3],[4,-8,3],[5,-8,3],[6,-8,3],[7,-8,3],[8,-8,3],[9,-8,3],[10,-8,3],[11,-8,3],[0,-7,3],[1,-7,3],[2,-7,3],[3,-7,3],[4,-7,3],[5,-7,3],[6,-7,3],[7,-7,3],[8,-7,3],[9,-7,3],[10,-7,3],[11,-7,3],[0,-6,3],[1,-6,3],[2,-6,3],[3,-6,3],[4,-6,3],[5,-6,3],[6,-6,3],[7,-6,3],[8,-6,3],[9,-6,3],[10,-6,3],[11,-6,3],[0,-5,3],[1,-5,3],[2,-5,3],[3,-5,3],[4,-5,3],[5,-5,3],[6,-5,3],[7,-5,3],[8,-5,3],[9,-5,3],[10,-5,3],[11,-5,3],[0,-4,3],[1,-4,3],[2,-4,3],[3,-4,3],[4,-4,3],[5,-4,3],[6,-4,3],[7,-4,3],[8,-4,3],[9,-4,3],[10,-4,3],[11,-4,3],[0,-3,3],[1,-3,3],[2,-3,3],[3,-3,3],[4,-3,3],[5,-3,3],[6,-3,3],[7,-3,3],[8,-3,3],[9,-3,3],[10,-3,3],[11,-3,3],[0,-2,3],[1,-2,3],[2,-2,3],[3,-2,3],[4,-2,3],[5,-2,3],[6,-2,3],[7,-2,3],[8,-2,3],[9,-2,3],[10,-2,3],[11,-2,3],[0,-1,3],[1,-1,3],[2,-1,3],[3,-1,3],[4,-1,3],[5,-1,3],[6,-1,3],[7,-1,3],[8,-1,3],[9,-1,3],[10,-1,3],[11,-1,3],[-12,0,3],[-11,0,3],[-10,0,3],[-9,0,3],[-8,0,3],[-7,0,3],[-6,0,3],[-5,0,3],[-4,0,3],[-3,0,3],[-2,0,3],[-1,0,3],[-12,1,3],[-11,1,3],[-10,1,3],[-9,1,3],[-8,1,3],[-7,1,3],[-6,1,3],[-5,1,3],[-4,1,3],[-3,1,3],[-2,1,3],[-1,1,3],[-12,2,3],[-11,2,3],[-10,2,3],[-9,2,3],[-8,2,3],[-7,2,3],[-6,2,3],[-5,2,3],[-4,2,3],[-3,2,3],[-2,2,3],[-1,2,3],[-12,3,3],[-11,3,3],[-10,3,3],[-9,3,3],[-8,3,3],[-7,3,3],[-6,3,3],[-5,3,3],[-4,3,3],[-3,3,3],[-2,3,3],[-1,3,3],[-12,4,3],[-11,4,3],[-10,4,3],[-9,4,3],[-8,4,3],[-7,4,3],[-6,4,3],[-5,4,3],[-4,4,3],[-3,4,3],[-2,4,3],[-1,4,3],[-12,5,3],[-11,5,3],[-10,5,3],[-9,5,3],[-8,5,3],[-7,5,3],[-6,5,3],[-5,5,3],[-4,5,3],[-3,5,3],[-2,5,3],[-1,5,3],[-12,6,3],[-11,6,3],[-10,6,3],[-9,6,3],[-8,6,3],[-7,6,3],[-6,6,3],[-5,6,3],[-4,6,3],[-3,6,3],[-2,6,3],[-1,6,3],[-12,7,3],[-11,7,3],[-10,7,3],[-9,7,3],[-8,7,3],[-7,7,3],[-6,7,3],[-5,7,3],[-4,7,3],[-3,7,3],[-2,7,3],[-1,7,3],[-12,8,3],[-11,8,3],[-10,8,3],[-9,8,3],[-8,8,3],[-7,8,3],[-6,8,3],[-5,8,3],[-4,8,3],[-3,8,3],[-2,8,3],[-1,8,3],[-12,9,3],[-11,9,3],[-10,9,3],[-9,9,3],[-8,9,3],[-7,9,3],[-6,9,3],[-5,9,3],[-4,9,3],[-3,9,3],[-2,9,3],[-1,9,3],[-12,10,3],[-11,10,3],[-10,10,3],[-9,10,3],[-8,10,3],[-7,10,3],[-6,10,3],[-5,10,3],[-4,10,3],[-3,10,3],[-2,10,3],[-1,10,3],[-12,11,3],[-11,11,3],[-10,11,3],[-9,11,3],[-8,11,3],[-7,11,3],[-6,11,3],[-5,11,3],[-4,11,3],[-3,11,3],[-2,11,3],[-1,11,3],[-12,-11,3],[-11,-11,3],[-10,-11,3],[-9,-11,3],[-8,-11,3],[-7,-11,3],[-6,-11,3],[-5,-11,3],[-4,-11,3],[-3,-11,3],[-2,-11,3],[-1,-11,3],[-12,-10,3],[-11,-10,3],[-10,-10,3],[-9,-10,3],[-8,-10,3],[-7,-10,3],[-6,-10,3],[-5,-10,3],[-4,-10,3],[-3,-10,3],[-2,-10,3],[-1,-10,3],[-12,-9,3],[-11,-9,3],[-10,-9,3],[-9,-9,3],[-8,-9,3],[-7,-9,3],[-6,-9,3],[-5,-9,3],[-4,-9,3],[-3,-9,3],[-2,-9,3],[-1,-9,3],[-12,-8,3],[-11,-8,3],[-10,-8,3],[-9,-8,3],[-8,-8,3],[-7,-8,3],[-6,-8,3],[-5,-8,3],[-4,-8,3],[-3,-8,3],[-2,-8,3],[-1,-8,3],[-12,-7,3],[-11,-7,3],[-10,-7,3],[-9,-7,3],[-8,-7,3],[-7,-7,3],[-6,-7,3],[-5,-7,3],[-4,-7,3],[-3,-7,3],[-2,-7,3],[-1,-7,3],[-12,-6,3],[-11,-6,3],[-10,-6,3],[-9,-6,3],[-8,-6,3],[-7,-6,3],[-6,-6,3],[-5,-6,3],[-4,-6,3],[-3,-6,3],[-2,-6,3],[-1,-6,3],[-12,-5,3],[-11,-5,3],[-10,-5,3],[-9,-5,3],[-8,-5,3],[-7,-5,3],[-6,-5,3],[-5,-5,3],[-4,-5,3],[-3,-5,3],[-2,-5,3],[-1,-5,3],[-12,-4,3],[-11,-4,3],[-10,-4,3],[-9,-4,3],[-8,-4,3],[-7,-4,3],[-6,-4,3],[-5,-4,3],[-4,-4,3],[-3,-4,3],[-2,-4,3],[-1,-4,3],[-12,-3,3],[-11,-3,3],[-10,-3,3],[-9,-3,3],[-8,-3,3],[-7,-3,3],[-6,-3,3],[-5,-3,3],[-4,-3,3],[-3,-3,3],[-2,-3,3],[-1,-3,3],[-12,-2,3],[-11,-2,3],[-10,-2,3],[-9,-2,3],[-8,-2,3],[-7,-2,3],[-6,-2,3],[-5,-2,3],[-4,-2,3],[-3,-2,3],[-2,-2,3],[-1,-2,3],[-12,-1,3],[-11,-1,3],[-10,-1,3],[-9,-1,3],[-8,-1,3],[-7,-1,3],[-6,-1,3],[-5,-1,3],[-4,-1,3],[-3,-1,3],[-2,-1,3],[-1,-1,3]]]]}`);

    return from([true]);
  }

  protected spawnEntities(): HumanoidEntity[] {
    const teamAController = new NeuralNetworkControllerFactory();
    const teamBController = new DecisionTreeControllerFactory();

    const preset = new BattlePresetControllersComptetition(5,
      this.entitySpawner,
      teamAController,
      teamBController);

    preset.addPositionOffset = (pos) => new Phaser.Math.Vector2(pos.x + 2 * (Math.random() - 0.5), pos.y + 2 * (Math.random() - 0.5));
    const generatedEntities = preset.generateEntities();

    this.initStatsForEntityTeams(generatedEntities, teamAController, teamBController);
    this.monitorGameEnding(generatedEntities);

    return generatedEntities;
  }

  protected initStatsForEntityTeams(entities: HumanoidEntity[], teamAController: AIControllerFactory, teamBController: AIControllerFactory) {
    const factions = [...new Set(entities.map(e => e.faction))].filter(f => f !== Faction.Player);

    factions.forEach(faction => {
      const factionEntities = entities.filter(e => e.faction === faction);
      const hostileEntities = entities.filter(e => e.faction !== faction);

      const numOfAllies = factionEntities.length;
      const numOfEnemies = hostileEntities.length;
      const alliesTotalHealth = factionEntities.map(e => e.maxHealth).reduce((p, c) => p + c);
      const enemiesTotalHealth = hostileEntities.map(e => e.maxHealth).reduce((p, c) => p + c);

      this.game.events.emit(InitStatsEventArgs.eventName(), new InitStatsEventArgs({
        faction,
        teamName: faction === Faction.TeamA ? teamAController.controllerName : teamBController.controllerName,
        numOfAllies,
        numOfEnemies,
        alliesTotalHealth,
        enemiesTotalHealth,
      }))
    });
  }

  protected monitorGameEnding(entities: HumanoidEntity[]) {
    const aliveEntities = [...entities];
    let timeout: NodeJS.Timeout;

    const subs = aliveEntities.map(e => e.destroyed.subscribe(() => {
      const index = aliveEntities.indexOf(e);

      aliveEntities.splice(index, 1);

      const aliveFactions = [...new Set(aliveEntities.map(ent => ent.faction))].filter(f => f !== Faction.Player);
      if (aliveFactions.length <= 1) {
        // only one faction left
        this.game.events.emit(GameOverEventArgs.eventName(), new GameOverEventArgs({
          winningTeam: aliveFactions.length === 1 ? aliveFactions[0] : 0,
          timeout: false
        }));
        subs.forEach(s => s.unsubscribe());
        clearTimeout(timeout);
      }
    }));

    timeout = setTimeout(() => {
      console.log(`TIMEOUT ON ROOM ${this.roomName}`);
      subs.forEach(s => s.unsubscribe());
      this.game.events.emit(GameOverEventArgs.eventName(), new GameOverEventArgs({
        winningTeam: 0,
        timeout: true
      }));
    }, gameOverTimeout * 1000);
  }
}