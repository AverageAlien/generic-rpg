import * as io from 'socket.io';
import { NetworkLevel } from '../gameData/scenes/networkLevel';
import { ClientController } from '../gameData/gameplay/controllers/clientController';
import { ServerPackets } from '../networkPackets/fromServer/serverPackets';
import { PacketPlayerInputMove } from '../networkPackets/fromServer/playerInputMove';

export class NetworkControllerService {
  static addPlayerInputListeners(controller: ClientController, levelScene: NetworkLevel) {
    controller.movementChanged.subscribe((moveVector) => {
      const networkId = controller.controlledEntity.networkId;
      levelScene.broadcastPacket(ServerPackets.PLAYER_INPUT_MOVE, {
        moveX: moveVector.x,
        moveY: moveVector.y,
        networkId,
      } as PacketPlayerInputMove);
    });
  }
}
