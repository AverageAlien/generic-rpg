import { Item } from 'src/app/gameplay/items/baseItem';
import { PacketSpawnEntityHumanoid } from './spawnEntity';

export interface PacketSpawnPlayer extends PacketSpawnEntityHumanoid {
    inventory: Item[];
}
