import fs from 'fs';
import * as tf from '@tensorflow/tfjs-node';
import * as sk from 'scikitjs';
import { DecisionTreeClassifier, fromJSON } from 'scikitjs';
import { MachineState } from './machineStates';
import { SituationContext } from './situationContext.model';
import { DatasetRowAggregator } from '../../../ai-learning/datasetRowAggregator';

export class DecisionTreeClassification {
  private static model: DecisionTreeClassifier;

  static async init() {
    console.log('Begin decision tree init');
    sk.setBackend(tf);

    const modelJson = fs.readFileSync('trainedModels/decisionTreeModel/model.json', 'utf-8');
    this.model = await fromJSON(modelJson);
    console.log('Decision tree init complete')
  }

  static predictState(previousState: MachineState, ctx: SituationContext): MachineState {
    const datasetRow = DatasetRowAggregator.MakeDatasetRow(previousState, previousState, ctx);
    const {currentState, ...inputModel} = datasetRow;

    const prediction = this.model.predict([Object.values(inputModel)]);

    console.log(`PREDICTED ${prediction[0]}`);

    return prediction[0];
  }
}