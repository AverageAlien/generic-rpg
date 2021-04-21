import * as io from 'socket.io';
import { NetworkLevel } from '../gameData/scenes/networkLevel';
import { ClientController } from '../gameData/gameplay/controllers/clientController';
import { ServerPackets } from '../networkPackets/fromServer/serverPackets';
import { PacketPlayerInputMove } from '../networkPackets/fromServer/playerInputMove';
import { PacketArmorEquipped } from '../networkPackets/fromServer/armorEquipped';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { PacketWeaponEquipped } from '../networkPackets/fromServer/weaponEquipped';

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
      console.log('EQUIP ARMOR HANDLED');
      if (controller.controlledEntity instanceof HumanoidEntity) {
        controller.controlledEntity.equipArmor(armor);

        console.log('EQUIP ARMOR HANDLED 2');
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
}
