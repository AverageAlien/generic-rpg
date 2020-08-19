import * as io from 'socket.io';

export interface GameClient {
    nickname: string;
    socket: io.Socket;
    ping?: number;
}