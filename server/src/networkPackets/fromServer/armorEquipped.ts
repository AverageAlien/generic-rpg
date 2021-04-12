import { Armor } from '../../gameData/gameplay/items/armor';

export interface PacketArmorEquipped {
  networkId: string;
  armor: Armor;
}
