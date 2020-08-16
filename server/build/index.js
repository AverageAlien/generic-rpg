"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var io = require("socket.io");
var fs = require("fs");
var path = require("path");
var roomService_1 = require("./services/roomService");
var app = express();
var httpServer = new http.Server(app);
var ioServer = io(httpServer, {
    path: '/game-ws'
});
var roomService = new roomService_1.RoomService(ioServer);
var clientRoot = path.join(__dirname, 'client');
app.get('/test', function (req, res) {
    res.send('hello world!');
});
app.get('*', function (req, res) {
    fs.stat(clientRoot + req.path, function (err) {
        if (err) {
            res.sendFile('index.html', { root: clientRoot });
        }
        else {
            res.sendFile(req.path, { root: clientRoot });
        }
    });
});
httpServer.listen(42069);
