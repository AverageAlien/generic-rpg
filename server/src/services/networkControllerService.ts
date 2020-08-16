import * as io from 'socket.io';
import { NetworkLevel } from 'src/gameData/scenes/networkLevel';
import { ClientController } from 'src/gameData/gameplay/controllers/clientController';
import { ServerPackets } from 'src/networkPackets/fromServer/serverPackets';
import { PacketPlayerInputMove } from 'src/networkPackets/fromServer/playerInputMove';

export class NetworkControllerService {
  static addPlayerInputListeners(controller: ClientController, levelScene: NetworkLevel) {
    controller.movementChanged.subscribe((moveVector) => {
      const networkId = controller.controlledEntity.networkId;
      levelScene.broadcastPacket(ServerPackets.PLAYER_INPUT_MOVE, {
        moveVector,
        networkId,
      } as PacketPlayerInputMove);
    });
  }
}
