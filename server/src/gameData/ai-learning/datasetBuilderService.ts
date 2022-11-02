import { MachineState } from '../gameplay/controllers/machineInfrastructure/machineStates';
import { CsvBuilder } from './csvBuider';

export class DatasetBuilderService {
  private csvBuilder: CsvBuilder<DatasetRow>;

  constructor(datasetName: string) {
    this.csvBuilder = new CsvBuilder<DatasetRow>(datasetName);
  }

  public addRow(row: DatasetRow) {
    this.csvBuilder.addRow(row);
  }

  public close() {
    this.csvBuilder.close();
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