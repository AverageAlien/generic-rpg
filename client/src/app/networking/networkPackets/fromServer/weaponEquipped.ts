import { Weapon } from 'src/app/gameplay/items/weapon';

export interface PacketWeaponEquipped {
  networkId: string;
  weapon: Weapon;
}
