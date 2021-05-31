import { Subscription } from 'rxjs';
import * as io from 'socket.io';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { Item } from '../gameData/gameplay/items/baseItem';
import { PacketClientSync } from '../networkPackets/fromClient/clientSync';

export interface GameClient {
    nickname: string;
    controlledEntity?: HumanoidEntity;
    inventory: Item[];
    socket: io.Socket;
    socketSubscriptions: Subscription[];
    ping: number;
    syncSnapshot?: PacketClientSync;
    syncSnapshotTimestamp?: number;
}