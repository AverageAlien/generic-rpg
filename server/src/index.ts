import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const server = express();

const clientRoot = path.join(__dirname, 'client');

server.get('/test', (req, res) => {
  res.send('hello world!');
});

server.get('*', (req, res) => {
  fs.stat(clientRoot + req.path, (err) => {
    if (err) {
      res.sendFile('index.html', { root: clientRoot });
    } else {
      res.sendFile(req.path, { root: clientRoot });
    }
  });
});

server.listen(42069);
