import fs, { WriteStream } from 'fs';
import { MachineState } from '../gameplay/controllers/machineInfrastructure/machineStates';

export class DatasetBuilderService {
  private fileStream: WriteStream;

  constructor(private datasetName: string) {
    this.fileStream = fs.createWriteStream(`${datasetName}.csv`, { flags: 'w' })
  }


}

export interface DatasetRow {
  currentState: MachineState,
  previousState: MachineState,

  health: number,
  maxHealth: number,
  armor: number,
  speed: number,
  weaponDamage: number,
  weaponReach: number,
  weaponRefire: number,
  wewaponSwing: number,

  targetHealth: number,
  targetMaxHealth: number,
  targetArmor: number,
  targetSpeed: number,
  targetDamage: number,
  targetReach: number,
  targetRefire: number,
  targetSwing: number,
  targetDistanceSq: number,

  // todo: add aggregated parameters of allies
  // todo: add aggregated parameters of enemies
}