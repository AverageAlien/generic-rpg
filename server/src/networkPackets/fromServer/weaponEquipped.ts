import { Weapon } from '../../gameData/gameplay/items/weapon';

export interface PacketWeaponEquipped {
  networkId: string;
  weapon: Weapon;
}
