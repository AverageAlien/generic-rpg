"use strict";
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var path = require("path");
var server = express();
var clientRoot = path.join(__dirname, 'client');
server.get('/test', function (req, res) {
    res.send('hello world!');
});
server.get('*', function (req, res) {
    fs.stat(clientRoot + req.path, function (err) {
        if (err) {
            res.sendFile('index.html', { root: clientRoot });
        }
        else {
            res.sendFile(req.path, { root: clientRoot });
        }
    });
});
server.listen(42069);
