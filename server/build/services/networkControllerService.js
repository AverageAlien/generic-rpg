import { ServerPackets } from '../networkPackets/fromServer/serverPackets';
export class NetworkControllerService {
    static addPlayerInputListeners(controller, levelScene) {
        controller.movementChanged.subscribe((moveVector) => {
            const networkId = controller.controlledEntity.networkId;
            levelScene.broadcastPacket(ServerPackets.PLAYER_INPUT_MOVE, {
                moveVector,
                networkId,
            });
        });
    }
}
//# sourceMappingURL=networkControllerService.js.map