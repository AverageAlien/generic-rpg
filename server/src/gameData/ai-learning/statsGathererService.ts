import { Faction } from "../../core/factions";
import { DamageDealtEventArgs } from "../eventArgs/damageDealtEventArgs";
import { FrameStateUpdateEventArgs } from "../eventArgs/frameStateUpdateEventArgs";
import { GameOverEventArgs } from "../eventArgs/gameOverEventArgs";
import { InitStatsEventArgs } from "../eventArgs/initStatsEventArgs";
import { MachineState } from "../gameplay/controllers/machineInfrastructure/machineStates";
import { CsvBuilder } from "./csvBuider";

export class StatisticsGathererService {
  private teamsStatistics: TeamStats[] = [];

  constructor(private statisticsFileName: string) {
    console.log(`Recording team statistics into file ${statisticsFileName}.csv`);
  }

  public initTeamStats(initData: InitStatsEventArgs) {
    const existingTeam = this.teamsStatistics.find(ts => ts.faction === initData.faction);

    if (!!existingTeam) {
      throw new Error('Team already initialized');
    }

    const newTeam: TeamStats = {
      faction: initData.faction,
      teamName: initData.teamName,
      framesSpent: 0,
      framesSpentNavigating: 0,
      framesSpentAttacking: 0,
      framesSpentRetreating: 0,
      enemiesKilled: 0,
      alliesLost: 0,
      totalEnemies: initData.numOfEnemies,
      totalAllies: initData.numOfAllies,
      enemyTotalHealth: initData.enemiesTotalHealth,
      allyTotalHealth: initData.alliesTotalHealth,
      damageDealt: 0,
      damageReceived: 0,
      winner: false
    }

    this.teamsStatistics.push(newTeam);
  }

  public recordFrameUpdate(frameArgs: FrameStateUpdateEventArgs) {
    const team = this.getTeam(frameArgs.faction);
    team.framesSpent++;

    switch (frameArgs.currentState) {
      case MachineState.Attack:
        team.framesSpentAttacking++;
        break;
      case MachineState.NavigateToTarget:
        team.framesSpentNavigating++;
        break;
      case MachineState.Retreat:
        team.framesSpentRetreating++;
        break;
      default:
        break;
    }
  }

  public recordDamageDealt(damageArgs: DamageDealtEventArgs) {
    const attackerTeam = this.getTeam(damageArgs.attackerFaction);
    const victimTeam = this.getTeam(damageArgs.victimFaction);

    attackerTeam.damageDealt += damageArgs.damageDealt;
    victimTeam.damageReceived += damageArgs.damageDealt;

    if (damageArgs.killed) {
      attackerTeam.enemiesKilled++;
      victimTeam.alliesLost++;
    }
  }

  public endStats(gameOver: GameOverEventArgs) {
    try {
      const winnerTeam = this.getTeam(gameOver.winningTeam);

      winnerTeam.winner = true;
    } catch (error) {
      console.log('Game ended in a DRAW!');
    }

    const summaries = this.teamsStatistics.map(this.buildSummary);

    const csvBuilder = new CsvBuilder<TeamSummary>(this.statisticsFileName);
    summaries.forEach(s => csvBuilder.addRow(s));
    csvBuilder.close();

    console.log(`Statistics recorded and saved into ${this.statisticsFileName}.csv. Team ${gameOver.winningTeam} won!`);
  }

  private buildSummary(teamStats: TeamStats): TeamSummary {
    return {
      faction: teamStats.faction,
      teamName: teamStats.teamName,
      percentageOfTimeSpentAttacking: teamStats.framesSpentAttacking / teamStats.framesSpent,
      percentageOfTimeSpentNavigating: teamStats.framesSpentNavigating / teamStats.framesSpent,
      percentageOfTimeSpentRetreating: teamStats.framesSpentRetreating / teamStats.framesSpent,
      enemiesKilled: teamStats.enemiesKilled,
      enemiesKilledPercentage: teamStats.enemiesKilled / teamStats.totalEnemies,
      alliesLost: teamStats.alliesLost,
      alliesLostPercentage: teamStats.alliesLost / teamStats.totalAllies,
      damageDealt: teamStats.damageDealt,
      damageDealtPercentage: teamStats.damageDealt / teamStats.enemyTotalHealth,
      damageReceived: teamStats.damageReceived,
      damageReceivedPercentage: teamStats.damageReceived / teamStats.allyTotalHealth
    };
  }

  private getTeam(faction: Faction): TeamStats {
    const foundTeam = this.teamsStatistics.find(ts => ts.faction === faction);

    if (!foundTeam) {
      throw new Error('Team not initialized');
    }

    return foundTeam;
  }
}

interface TeamStats {
  faction: Faction,
  teamName: string,
  framesSpent: number,
  framesSpentNavigating: number,
  framesSpentAttacking: number,
  framesSpentRetreating: number,
  enemiesKilled: number,
  totalEnemies: number,
  alliesLost: number,
  totalAllies: number,
  enemyTotalHealth: number,
  allyTotalHealth: number,
  damageDealt: number,
  damageReceived: number,
  winner: boolean
}

interface TeamSummary {
  faction: Faction,
  teamName: string,
  percentageOfTimeSpentNavigating: number,
  percentageOfTimeSpentAttacking: number,
  percentageOfTimeSpentRetreating: number,
  enemiesKilled: number,
  enemiesKilledPercentage: number,
  alliesLost: number,
  alliesLostPercentage: number,
  damageDealt: number,
  damageDealtPercentage: number,
  damageReceived: number,
  damageReceivedPercentage: number
}