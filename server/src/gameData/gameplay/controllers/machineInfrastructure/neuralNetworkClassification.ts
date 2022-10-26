import * as tf from '@tensorflow/tfjs';
import * as tfnd from '@tensorflow/tfjs-node';
import { DatasetRowAggregator } from '../../../ai-learning/datasetRowAggregator';
import { MachineState } from './machineStates';
import { SituationContext } from './situationContext.model';

export class NeuralNetworkClassification {
  private static model: tf.LayersModel;

  static async init() {
    console.log('Begin neural network init');
    const handler = tfnd.io.fileSystem('trainedModels/neuralNetModel/model.json');
    this.model = await tfnd.loadLayersModel(handler);
    console.log('Neural network init complete');
  }

  static predictState(previousState: MachineState, ctx: SituationContext): MachineState {
    const datasetRow = DatasetRowAggregator.MakeDatasetRow(previousState, previousState, ctx);
    const {currentState, ...inputModelLong} = datasetRow;

    const rawInput = Object.values(inputModelLong);
    const tensor = tfnd.tensor2d(rawInput as any, [1, 38]);
    const pred = this.model.predict(tensor);
    const pIndex = tfnd.argMax(pred as any, 1).dataSync()[0];

    console.log('PREDICTED');
    console.log(pred.toString());

    return pIndex;
  }
}