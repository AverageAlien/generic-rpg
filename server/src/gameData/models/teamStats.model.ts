import { Faction } from '../../core/factions';

export interface TeamStatsModel {
  faction: Faction;
  teamName: string;
  totalFramesSpent: number;
  framesSpentNavigating: number;
  framesSpentAttacking: number;
  framesSpentRetreating: number;
  enemiesKilled: number;
  enemiesTotal: number;
  alliesKilled: number;
  alliesTotal: number;
  damageDealt: number;
  damageReceived: number;
  enemiesTotalHealth: number;
  alliesTotalHealth: number;
}