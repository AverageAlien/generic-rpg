import { Faction } from "../../core/factions";
import { BaseEventArgs } from "./eventArgs.base";

export class GameOverEventArgs extends BaseEventArgs {
  winningTeam: Faction;
  timeout: boolean;

  public static eventName() {
    return 'GAME_OVER';
  }

  public constructor(init?: Partial<GameOverEventArgs>) {
    super();

    Object.assign(this, init);
  }
}