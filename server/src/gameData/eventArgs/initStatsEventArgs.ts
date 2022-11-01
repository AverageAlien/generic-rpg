import { Faction } from "../../core/factions";
import { BaseEventArgs } from "./eventArgs.base";

export class InitStatsEventArgs extends BaseEventArgs {
  faction: Faction;
  numOfAllies: number;
  numOfEnemies: number;
  alliesTotalHealth: number;
  enemiesTotalHealth: number;

  public static eventName() {
    return 'INIT_STATS';
  }

  public constructor(init?: Partial<InitStatsEventArgs>) {
    super();

    Object.assign(this, init);
  }
}