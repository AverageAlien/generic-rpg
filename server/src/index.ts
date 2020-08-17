import express from 'express';
import * as http from 'http';
import io from 'socket.io';
import * as fs from 'fs';
import * as path from 'path';
import { RoomService } from './services/roomService';

const app = express();
const httpServer = new http.Server(app);
const ioServer = io(httpServer, {
  path: '/game-ws'
});

const roomService = new RoomService(ioServer);

const clientRoot = path.join(__dirname, 'client');

app.get('/test', (req, res) => {
  res.send('hello world!');
});

app.get('*', (req, res) => {
  fs.stat(clientRoot + req.path, (err) => {
    if (err) {
      res.sendFile('index.html', { root: clientRoot });
    } else {
      res.sendFile(req.path, { root: clientRoot });
    }
  });
});

httpServer.listen(42069);
