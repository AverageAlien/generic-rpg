"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkControllerService = void 0;
const serverPackets_1 = require("../networkPackets/fromServer/serverPackets");
class NetworkControllerService {
    static addPlayerInputListeners(controller, levelScene) {
        controller.movementChanged.subscribe((moveVector) => {
            const networkId = controller.controlledEntity.networkId;
            levelScene.broadcastPacket(serverPackets_1.ServerPackets.PLAYER_INPUT_MOVE, {
                moveX: moveVector.x,
                moveY: moveVector.y,
                networkId,
            });
        });
    }
}
exports.NetworkControllerService = NetworkControllerService;
