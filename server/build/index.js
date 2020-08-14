"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var io = require("socket.io");
var fs = require("fs");
var path = require("path");
var app = express();
var httpServer = new http.Server(app);
var ioServer = io(httpServer, {
    path: '/ws-test'
});
var clientRoot = path.join(__dirname, 'client');
app.get('/test', function (req, res) {
    res.send('hello world!');
});
ioServer.on('connection', function (socket) {
    console.log(socket.client.id + " connected.");
    console.log(ioServer.origins());
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
