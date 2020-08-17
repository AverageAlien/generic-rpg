"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const clientPackets_1 = require("../../../networkPackets/fromClient/clientPackets");
const rxjs_1 = require("rxjs");
class ClientController {
    constructor(socket, controlledEntity) {
        this.socket = socket;
        this.controlledEntity = controlledEntity;
        this.movementChanged$ = new rxjs_1.BehaviorSubject(Phaser.Math.Vector2.ZERO);
        socket.on(clientPackets_1.ClientPackets.MOVE_INPUT, (p) => {
            this.movementChanged$.next(new Phaser.Math.Vector2(p.moveX, p.moveY).normalize());
        });
    }
    get movement() {
        return new Phaser.Math.Vector2(this.movementChanged$.value);
    }
    get movementChanged() {
        return this.movementChanged$.asObservable();
    }
    get attack() {
        return null;
    }
}
exports.ClientController = ClientController;
