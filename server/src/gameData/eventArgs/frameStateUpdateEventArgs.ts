import { Faction } from "../../core/factions";
import { MachineState } from "../gameplay/controllers/machineInfrastructure/machineStates";
import { BaseEventArgs } from "./eventArgs.base";

export class FrameStateUpdateEventArgs extends BaseEventArgs {
  faction: Faction;
  currentState: MachineState;

  public static eventName() {
    return 'FRAME_STATE_UPDATE';
  }

  public constructor(init?: Partial<FrameStateUpdateEventArgs>) {
    super();

    Object.assign(this, init);
  }
}