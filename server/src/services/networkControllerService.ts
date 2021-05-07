import * as io from 'socket.io';
import { NetworkLevel } from '../gameData/scenes/networkLevel';
import { ClientController } from '../gameData/gameplay/controllers/clientController';
import { ServerPackets } from '../networkPackets/fromServer/serverPackets';
import { PacketPlayerInputMove } from '../networkPackets/fromServer/playerInputMove';
import { PacketArmorEquipped } from '../networkPackets/fromServer/armorEquipped';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { PacketWeaponEquipped } from '../networkPackets/fromServer/weaponEquipped';
import { ServerWrapperController } from '../gameData/gameplay/controllers/serverWrapperController';

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

    controller.equipArmor.subscribe(armor => {
      if (controller.controlledEntity instanceof HumanoidEntity) {
        controller.controlledEntity.equipArmor(armor);

        levelScene.broadcastPacket(ServerPackets.ARMOR_EQUIPPED, {
          networkId: controller.controlledEntity.networkId,
          armor
        } as PacketArmorEquipped);
      }
    });

    controller.equipWeapon.subscribe(weapon => {
      if (controller.controlledEntity instanceof HumanoidEntity) {
        controller.controlledEntity.equipWeapon(weapon);

        levelScene.broadcastPacket(ServerPackets.WEAPON_EQUIPPED, {
          networkId: controller.controlledEntity.networkId,
          weapon
        } as PacketWeaponEquipped)
      }
    })
  }

  static addServerBotInputListeners(controller: ServerWrapperController, levelScene: NetworkLevel) {
    controller.movementChanged.subscribe(movement => {
      const networkId = controller.controlledEntity.networkId;
      levelScene.broadcastPacket(ServerPackets.PLAYER_INPUT_MOVE, {
        moveX: movement.x,
        moveY: movement.y,
        networkId,
      } as PacketPlayerInputMove);
    })
  }
}
