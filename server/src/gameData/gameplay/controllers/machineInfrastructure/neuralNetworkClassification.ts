import * as tf from '@tensorflow/tfjs';
import * as tfnd from '@tensorflow/tfjs-node';
import { DatasetRowAggregator } from '../../../ai-learning/datasetRowAggregator';
import { MachineState } from './machineStates';
import { SituationContext } from './situationContext.model';

export class NeuralNetworkClassification {
  private static model: tf.LayersModel;

  static async init() {
    const handler = tfnd.io.fileSystem('trainedModels/neuralNetModel/model.json');
    this.model = await tfnd.loadLayersModel(handler);
  }

  static predictState(previousState: MachineState, ctx: SituationContext): MachineState {
    const datasetRow = DatasetRowAggregator.MakeDatasetRow(previousState, previousState, ctx);

    const inputModel: ClassifierInputModel = {
      previousState: datasetRow.previousState,

      health: datasetRow.health,
      maxHealth: datasetRow.maxHealth,
      armor: datasetRow.armor,
      weaponDamage: datasetRow.weaponDamage,
      weaponReach: datasetRow.weaponReach,
      weaponSwing: datasetRow.weaponSwing,

      targetHealth: datasetRow.targetHealth,
      targetMaxHealth: datasetRow.targetMaxHealth,
      targetArmor: datasetRow.targetArmor,
      targetDamage: datasetRow.targetDamage,
      targetReach: datasetRow.targetReach,
      targetRefire: datasetRow.targetRefire,
      targetSwing: datasetRow.targetSwing,
      targetDistanceSq: datasetRow.targetDistanceSq,

      alliesCount: datasetRow.alliesCount,
      alliesTotalHealth: datasetRow.alliesTotalHealth,
      alliesTotalMaxHealth: datasetRow.alliesTotalMaxHealth,
      alliesAverageArmor: datasetRow.alliesAverageArmor,
      alliesAverageSpeed: datasetRow.alliesAverageSpeed,
      alliesAverageDamage: datasetRow.alliesAverageDamage,
      alliesAverageReach: datasetRow.alliesAverageReach,
      alliesAverageRefire: datasetRow.alliesAverageRefire,
      alliesAverageSwing: datasetRow.alliesAverageSwing,
      alliesAverageDistanceSq: datasetRow.alliesAverageDistanceSq,

      enemiesCount: datasetRow.enemiesCount,
      enemiesTotalHealth: datasetRow.enemiesTotalHealth,
      enemiesTotalMaxHealth: datasetRow.enemiesTotalMaxHealth,
      enemiesAverageArmor: datasetRow.enemiesAverageArmor,
      enemiesAverageDamage: datasetRow.enemiesAverageDamage,
      enemiesAverageReach: datasetRow.enemiesAverageReach,
      enemiesAverageSwing: datasetRow.enemiesAverageSwing,
      enemiesAverageDistanceSq: datasetRow.enemiesAverageDistanceSq,
    }

    const rawInput = Object.values(inputModel);
    const tensor = tfnd.tensor2d(rawInput as any, [1, 33]);
    const pred = this.model.predict(tensor);
    const pIndex = tfnd.argMax(pred as any, 1).dataSync()[0];

    console.log('PREDICTED');
    console.log(pred.toString());

    return pIndex;
  }
}

interface ClassifierInputModel {
  previousState: MachineState,

  health: number,
  maxHealth: number,
  armor: number,
  weaponDamage: number,
  weaponReach: number,
  weaponSwing: number,

  targetHealth: number,
  targetMaxHealth: number,
  targetArmor: number,
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
  enemiesAverageDamage: number,
  enemiesAverageReach: number,
  enemiesAverageSwing: number,
  enemiesAverageDistanceSq: number
}