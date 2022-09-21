import { MachineState } from '../gameplay/controllers/machineInfrastructure/machineStates';
import { SituationContext } from '../gameplay/controllers/machineInfrastructure/situationContext.model';
import { DatasetRow } from './datasetBuilderService';

export class DatasetRowAggregator {
  static MakeDatasetRow(currentState: MachineState, previousState: MachineState, ctx: SituationContext): DatasetRow {
    return null;
  }
}