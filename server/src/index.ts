import express from 'express';
import expressJwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as http from 'http';
import io from 'socket.io';
import * as fs from 'fs';
import * as path from 'path';
import * as tf from '@tensorflow/tfjs-node';

import { DecisionTreeClassifier } from 'scikitjs'

import { RoomService } from './services/roomService';
import { AuthenticationService } from './services/authService';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { AuthResult } from './models/authResult.model';
import { PlayerDataService } from './services/playerDataService';
import { TrainingService } from './services/trainingService';


(async () => {
  const myData = tf.data.csv('file://dataset-04-100games-short.csv', {
    columnConfigs: {
      currentState: {
        isLabel: true,
      }
    }
  });

  const numOfFeatures = (await myData.columnNames()).length - 1;

  console.log(await myData.columnNames());

  const convertedData = myData.map((tc: any) => {
    const labels = [
      tc.ys.currentState === 0,
      tc.ys.currentState === 1,
      tc.ys.currentState === 2,
      tc.ys.currentState === 3
    ]

    return { xs: Object.values((tc as any).xs), ys: Object.values(labels) }
  }).batch(100);

  console.log(await myData.columnNames());
  const model = tf.sequential();
  model.add(tf.layers.dense({inputShape: [ numOfFeatures ], activation: 'sigmoid', units: 16}));
  model.add(tf.layers.dense({ activation: 'softmax', units: 4 }));
  model.compile({ loss: 'categoricalCrossentropy', optimizer: tf.train.adam(0.06)});

  await model.fitDataset(convertedData, {
    epochs: 5,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log(`Epoch: ${epoch}; Loss: ${logs.Loss}`);
      }
    }
  });

  await model.save('file://testmodel');
  console.log('Training function complete');

  await myData.skip(7000).take(1).forEachAsync((tc: any) => {
    console.log(tc);

    const input = Object.values(tc.xs);
    console.log('INPUT');
    console.log(input);

    const testVal = tf.tensor2d(input as any, [1, numOfFeatures]);
    const pred = model.predict(testVal)
    const pIndex = tf.argMax(pred as any, 1).dataSync();
    console.log(pIndex);
  });


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
