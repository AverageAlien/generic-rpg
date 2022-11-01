import * as tf from '@tensorflow/tfjs-node';

export class NeuralNetworkTraining {
  static async run() {
    const myData = tf.data.csv('file://dataset-04-100games-short.csv', {
      columnConfigs: {
        currentState: {
          isLabel: true,
        }
      }
    });

    const numOfFeatures = (await myData.columnNames()).length - 1;
    const datasetSize = (await myData.toArray()).length;
    const trainSize = Math.floor(datasetSize * 0.7);
    const testSize = datasetSize - trainSize;

    console.log(`Size: ${datasetSize}; Train: ${trainSize}; Test: ${testSize}`);

    // console.log(await myData.columnNames());

    const mappedData = myData.map((tc: any) => {
      const labels = [
        tc.ys.currentState === 0,
        tc.ys.currentState === 1,
        tc.ys.currentState === 2,
        tc.ys.currentState === 3
      ]

      return { xs: Object.values((tc as any).xs), ys: Object.values(labels) }
    });

    const batchedData = mappedData.batch(100);

    console.log('Data converted');


    const shuffledData = mappedData.shuffle(999999);
    const trainBatch = shuffledData.take(trainSize).batch(100);
    const testBatch = shuffledData.skip(trainSize).take(testSize);

    const model = await this.loadModel();
    // const model = await this.trainModel(trainBatch, numOfFeatures);
    
    // await testBatch.take(1).forEachAsync((tc: any) => {
      //   console.log(tc)
    // });


    // const evalBatch = (await testBatch.toArray())
    //   .map((tc: any) => { return { x: tc.xs, y: tc.ys }; });
    // console.log(evalBatch[0]);
    // const evalX = tfnd.tensor2d(evalBatch.map(b => b.x) as any, [1, numOfFeatures]);
    // const evalY = tfnd.tensor2d(evalBatch.map(b => b.y) as any, [1, 4]);

    // console.log('Begin evaluation');
    // const evaluationResult = model.evaluate(evalX, evalY);
    // console.log('Evaluation complete');

    await testBatch
    .filter((tc: any) => tc.xs[0] !== (tc.ys as boolean[]).indexOf(true))
    .take(30)
    .forEachAsync((tc: any) => {
      console.log('INPUT ==================');
      console.log(tc);

      const input = Object.values(tc.xs);
      // console.log('INPUT');
      // console.log(input);

      const testVal = tf.tensor2d(input as any, [1, numOfFeatures]);
      const pred = model.predict(testVal)
      const pIndex = tf.argMax(pred as any, 1).dataSync();
      console.log('OUTPUT -----------------');
      console.log(pred.toString());
      console.log(pIndex);
    });

    // console.log('EVALUATION');
    // console.log(evaluationResult);
  }

  private static async trainModel(batchedData: tf.data.Dataset<tf.TensorContainer>, numOfFeatures: number): Promise<tf.LayersModel> {
    console.log('Begin training');
    const model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [ numOfFeatures ], activation: 'sigmoid', units: 16}));
    model.add(tf.layers.dense({ activation: 'softmax', units: 4 }));
    model.compile({ loss: 'categoricalCrossentropy', optimizer: tf.train.adam(0.06)});

    await model.fitDataset(batchedData, {
      epochs: 50,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          console.log(`Epoch: ${epoch}; Loss: ${logs.loss}`);
        }
      }
    });

    await model.save('file://trainedModels/neuralNetModel');
    console.log('Training function complete');
    return model;
  }

  private static async loadModel(): Promise<tf.LayersModel> {
    const handler = tf.io.fileSystem('trainedModels/neuralNetModel/model.json');
    const model = await tf.loadLayersModel(handler);
    console.log('Model loaded');

    return model;
  }
}