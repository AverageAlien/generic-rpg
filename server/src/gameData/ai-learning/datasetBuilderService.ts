import fs, { WriteStream } from 'fs';
import { MachineState } from '../gameplay/controllers/machineInfrastructure/machineStates';

export class DatasetBuilderService {
  private fileStream: WriteStream;
  private needHeader: boolean;

  constructor(private datasetName: string) {
    this.fileStream = fs.createWriteStream(`${datasetName}.csv`, { flags: 'w' })
    this.needHeader = true;
  }

  private addHeader(row: DatasetRow) {
    this.needHeader = false;
    const headerRow = Object.keys(row).join(',') + '\n';

    this.fileStream.write(headerRow);
  }

  public addRow(row: DatasetRow) {
    if (this.needHeader) {
      this.addHeader(row);
    }

    const dataRow = Object.values(row).join(',') + '\n';
    this.fileStream.write(dataRow);
  }

  public close() {
    this.fileStream.end();
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
  weaponSwing: number,

  targetHealth: number,
  targetMaxHealth: number,
  targetArmor: number,
  targetSpeed: number,
  targetDamage: number,
  targetReach: number,
  targetRefire: number,
  targetSwing: number,
  targetDistanceSq: number,

  alliesCount: number,
  alliesTotalHealth: number,
  alliesTotalMaxHealth: number,
  alliesAverageArmor: number,
  alliesAverageSpeed: number,
  alliesAverageDamage: number,
  alliesAverageReach: number,
  alliesAverageRefire: number,
  alliesAverageSwing: number,
  alliesAverageDistanceSq: number

  enemiesCount: number,
  enemiesTotalHealth: number,
  enemiesTotalMaxHealth: number,
  enemiesAverageArmor: number,
  enemiesAverageSpeed: number,
  enemiesAverageDamage: number,
  enemiesAverageReach: number,
  enemiesAverageRefire: number,
  enemiesAverageSwing: number,
  enemiesAverageDistanceSq: number
}