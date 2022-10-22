import express from 'express';
import expressJwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as http from 'http';
import io from 'socket.io';
import * as fs from 'fs';
import * as path from 'path';
import * as tf from '@tensorflow/tfjs';
import * as tfnd from '@tensorflow/tfjs-node';


import { DecisionTreeClassifier } from 'scikitjs'

import { RoomService } from './services/roomService';
import { AuthenticationService } from './services/authService';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { AuthResult } from './models/authResult.model';
import { PlayerDataService } from './services/playerDataService';
import { TrainingService } from './services/trainingService';
import ts from 'typescript';


(async () => {
  const myData = tfnd.data.csv('file://dataset-04-100games-short.csv', {
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

  const convertedData = myData.map((tc: any) => {
    const labels = [
      tc.ys.currentState === 0,
      tc.ys.currentState === 1,
      tc.ys.currentState === 2,
      tc.ys.currentState === 3
    ]

    return { xs: Object.values((tc as any).xs), ys: Object.values(labels) }
  }).shuffle(999999);// .batch(100);

  console.log('Data converted');

  const trainBatch = convertedData.take(trainSize).batch(100);
  const testBatch = convertedData.skip(trainSize).take(testSize);

  const handler = tfnd.io.fileSystem('testmodel/model.json');
  const model = await tfnd.loadLayersModel(handler);
  console.log('Model loaded');

  // await testBatch.take(1).forEachAsync((tc: any) => {
  //   console.log(tc)
  // });

  // console.log('Begin training');
  // const model = tf.sequential();
  // model.add(tf.layers.dense({inputShape: [ numOfFeatures ], activation: 'sigmoid', units: 16}));
  // model.add(tf.layers.dense({ activation: 'softmax', units: 4 }));
  // model.compile({ loss: 'categoricalCrossentropy', optimizer: tf.train.adam(0.06)});

  // await model.fitDataset(trainBatch, {
  //   epochs: 50,
  //   callbacks: {
  //     onEpochEnd: async (epoch, logs) => {
  //       console.log(`Epoch: ${epoch}; Loss: ${logs.loss}`);
  //     }
  //   }
  // });

  // await model.save('file://testmodel');
  // console.log('Training function complete');

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

    const testVal = tfnd.tensor2d(input as any, [1, numOfFeatures]);
    const pred = model.predict(testVal)
    const pIndex = tfnd.argMax(pred as any, 1).dataSync();
    console.log('OUTPUT -----------------');
    console.log(pred.toString());
    console.log(pIndex);
  });

  // console.log('EVALUATION');
  // console.log(evaluationResult);

})(); // comment the ()s to disable running

const serverPort = process.env.PORT || 42069;
export const GLOBAL_AUTH_SECRET = process.env.SECRET || 'myLocalSecret';
export const GLOBAL_AUTH_COOKIENAME = 'GenericRpg.AuthCookie';

const app = express();

app.use(cors.default({
  origin: ['http://localhost:4200', `localhost:${serverPort}`],
  credentials: true
}));

app.use(cookieParser());

app.use(expressJwt({
  secret: GLOBAL_AUTH_SECRET,
  algorithms: ['HS256'],
  getToken: function fromHeaderOrQuerystring (req) {
    return req.cookies[GLOBAL_AUTH_COOKIENAME];
  },
  credentialsRequired: false
}));

const httpServer = new http.Server(app);
const ioServer = io(httpServer, {
  path: '/game-ws',
  pingInterval: 2000,
  origins: ['http://localhost:4200', `localhost:${serverPort}`],
  allowRequest: (req, callback) => {
    return callback(null, true);
  }
});

const playerDataService = new PlayerDataService();
const authService = new AuthenticationService(playerDataService);
const roomService = new RoomService(ioServer, playerDataService);

// const trainingService = new TrainingService(ioServer, playerDataService);

// trainingService.runGamesForDatasetGeneration('dataset-04-100games', 100);

const clientRoot = path.join(__dirname, 'client');

app.use(express.json())
app.get('/api/test', (req, res) => {
  res.send(req.user);
});

app.post('/api/login', (req, res) => {
  const model = req.body as LoginModel;

  authService.login(model).subscribe(result => {
    if (!!result.username) {
      const authToken = AuthenticationService.makeToken(result);
      AuthenticationService.attachAuthCookie(res, authToken);
    }

    res.send(result);
  },
  err => {
    console.log(err);
    res.send({
      username: null,
      error: 'A server error occured'
    } as AuthResult)
  });
});

app.post('/api/register', (req, res) => {
  const model = req.body as RegisterModel;

  authService.register(model).subscribe(result => {
    if (!!result.username) {
      const authToken = AuthenticationService.makeToken(result);
      AuthenticationService.attachAuthCookie(res, authToken);
    }

    res.send(result);
  },
  err => {
    console.log(err);
    res.send({
      username: null,
      error: 'A server error occured'
    } as AuthResult)
  });
})

app.get('*', (req, res) => {
  fs.stat(clientRoot + req.path, (err) => {
    if (err) {
      res.sendFile('index.html', { root: clientRoot });
    } else {
      res.sendFile(req.path, { root: clientRoot });
    }
  });
});

httpServer.listen(serverPort);
console.log(`Server READY and listening to port ${serverPort}`);
