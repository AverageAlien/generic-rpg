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


import { DecisionTreeClassifier } from 'scikitjs';

import { RoomService } from './services/roomService';
import { AuthenticationService } from './services/authService';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { AuthResult } from './models/authResult.model';
import { PlayerDataService } from './services/playerDataService';
import { TrainingService } from './services/trainingService';
import ts from 'typescript';
import { NeuralNetworkClassification } from './gameData/gameplay/controllers/machineInfrastructure/neuralNetworkClassification';
import { NeuralNetworkTraining } from './topLevelFunctions/neuralNetworkTraining';
import { DecisionTreeTraining } from './topLevelFunctions/decisionTreeTraining';
import { DecisionTreeClassification } from './gameData/gameplay/controllers/machineInfrastructure/decisionTreeClassification';


NeuralNetworkTraining.run();
// DecisionTreeTraining.run();

// DecisionTreeClassification.init();
// NeuralNetworkClassification.init();

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
// const roomService = new RoomService(ioServer, playerDataService);

// const trainingService = new TrainingService(ioServer, playerDataService);
// trainingService.runGamesForDatasetGeneration('dataset-05-100games', 100);


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
