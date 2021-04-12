import { Armor } from 'src/app/gameplay/items/armor';

export interface PacketArmorEquipped {
  networkId: string;
  armor: Armor;
}
