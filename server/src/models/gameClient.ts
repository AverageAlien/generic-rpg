import { Subscription } from 'rxjs';
import * as io from 'socket.io';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { PacketClientSync } from '../networkPackets/fromClient/clientSync';

export interface GameClient {
    nickname: string;
    controlledEntity?: HumanoidEntity;
    socket: io.Socket;
    socketSubscriptions: Subscription[];
    ping: number;
    syncSnapshot?: PacketClientSync;
    syncSnapshotTimestamp?: number;
}