"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const roomService_1 = require("./services/roomService");
const app = express_1.default();
const httpServer = new http.Server(app);
const ioServer = socket_io_1.default(httpServer, {
    path: '/game-ws'
});
const roomService = new roomService_1.RoomService(ioServer);
const clientRoot = path.join(__dirname, 'client');
app.get('/test', (req, res) => {
    res.send('hello world!');
});
app.get('*', (req, res) => {
    fs.stat(clientRoot + req.path, (err) => {
        if (err) {
            res.sendFile('index.html', { root: clientRoot });
        }
        else {
            res.sendFile(req.path, { root: clientRoot });
        }
    });
});
httpServer.listen(42069);
