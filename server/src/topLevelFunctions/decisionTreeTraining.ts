import fs from 'fs';
import { parse } from 'csv';
import * as tf from '@tensorflow/tfjs-node';
import * as sk from 'scikitjs';
import { DecisionTreeClassifier, fromJSON } from 'scikitjs';

import { DatasetRow } from '../gameData/ai-learning/datasetBuilderService';

sk.setBackend(tf);

export class DecisionTreeTraining {
  static async run() {
    console.log('Begin decision tree training');

    const records = await this.loadDataset();

    const datasetLength = records.length;
    const trainRatio = 0.7;
    const trainSize = Math.floor(datasetLength * trainRatio);
    const testSize = datasetLength - trainSize;

    console.log('Dataset info:');
    console.log({ datasetLength, trainSize, testSize });

    const mapped = records.map(r => {
      return { X: Object.values(r).slice(1), y: r.currentState as number };
    });

    this.shuffle(mapped);

    console.log('Data mapped and shuffled')

    const trainBatch = mapped.slice(0, trainSize);
    const testBatch = mapped.slice(trainSize);

    const Xtrain = trainBatch.map(r => r.X);
    const ytrain = trainBatch.map(r => r.y);
    const Xtest = testBatch.map(r => r.X);
    const ytest = testBatch.map(r => r.y);

    // console.log(Xtest.slice(0, 5));

    // console.log('Start training');
    // const model = new DecisionTreeClassifier({ criterion: 'gini' });
    // await model.fit(Xtrain, ytrain);
    // console.log('Training finished');

    console.log('Loading model');
    const loadedModel = fs.readFileSync('trainedModels/decisionTreeModel/model.json', 'utf-8');
    const model: DecisionTreeClassifier = await fromJSON(loadedModel);
    console.log('Model loaded');


    console.log(model.score(Xtest, ytest));

    const predSample = testBatch[515].X;
    const pred = model.predict([predSample]);
    console.log(predSample);
    console.log(pred);


    // console.log('Saving model');
    // const modelJson = await model.toJSON();
    // fs.writeFileSync('trainedModels/decisionTreeModel/model.json', modelJson, { flag: 'w' });

    console.log('Decision tree training over');
  }

  static async loadDataset() {
    const records: DatasetRow[] = [];
    const parser = fs
      .createReadStream('dataset-05-100games.csv')
      .pipe(parse({
        delimiter: ',',
        columns: true,
        cast: true
      }));

    for await (const record of parser) {
      // Work with each record
      records.push(record);
    }

    return records;
  }

  static shuffle(array) {
    let currentIndex = array.length
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}