import { ClientPackets } from '../../../networkPackets/fromClient/clientPackets';
import { Subject } from 'rxjs';
export class ClientController {
    constructor(socket, controlledEntity) {
        this.socket = socket;
        this.controlledEntity = controlledEntity;
        this.currentMovement = Phaser.Math.Vector2.ZERO;
        this.movementChanged$ = new Subject();
        socket.on(ClientPackets.MOVE_INPUT, (p) => {
            this.currentMovement = p.moveVector.normalize();
            this.movementChanged$.next(this.currentMovement);
        });
    }
    get movement() {
        return this.currentMovement;
    }
    get movementChanged() {
        return this.movementChanged$.asObservable();
    }
    get attack() {
        return null;
    }
}
//# sourceMappingURL=clientController.js.map