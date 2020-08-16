import * as io from 'socket.io';
import { Controller } from './baseController';
import { ClientPackets } from 'src/networkPackets/fromClient/clientPackets';
import { PacketMoveInput } from 'src/networkPackets/fromClient/moveInput';
import { Subject } from 'rxjs';
import { Controllable } from '../entities/baseEntity';

export class ClientController implements Controller {
  private currentMovement = Phaser.Math.Vector2.ZERO;
  private movementChanged$ = new Subject<Phaser.Math.Vector2>();

  constructor(private socket: io.Socket, public controlledEntity: Controllable) {
    socket.on(ClientPackets.MOVE_INPUT, (p: PacketMoveInput) => {
      this.currentMovement = p.moveVector.normalize();

      this.movementChanged$.next(this.currentMovement);
    });
  }

  get movement(): Phaser.Math.Vector2 {
    return this.currentMovement;
  }

  get movementChanged() {
    return this.movementChanged$.asObservable();
  }

  get attack(): Phaser.Math.Vector2 {
    return null;
  }
}
