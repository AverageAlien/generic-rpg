import * as io from 'socket.io';
import { Controller } from 'src/gameData/gameplay/controllers/baseController';

export class ClientController implements Controller {
    private currentVector = Phaser.Math.Vector2.ZERO;

    constructor(private socket: io.Socket) {
        socket.on('movement', (vector: Phaser.Math.Vector2) => {
            this.currentVector = vector.normalize();
        });
    }

    get movement(): Phaser.Math.Vector2 {
        return this.currentVector;
    }

    get attack(): Phaser.Math.Vector2 {
        return null;
    }

}