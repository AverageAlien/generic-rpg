import express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import io from 'socket.io';
import * as fs from 'fs';
import * as path from 'path';

import { RoomService } from './services/roomService';
import { AuthenticationService } from './services/authService';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { AuthResult } from './models/authResult.model';
import { PlayerDataService } from './services/playerDataService';

const serverPort = process.env.PORT || 42069;

const app = express();
app.use(cors.default({
  origin: ['http://localhost:4200', `localhost:${serverPort}`]
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

const clientRoot = path.join(__dirname, 'client');

app.use(express.json())
app.get('/api/test', (req, res) => {
  res.send('hello world!');
});

app.post('/api/login', (req, res) => {
  const model = req.body as LoginModel;

  authService.login(model).subscribe(result => {
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
