import * as io from 'socket.io';
import { Controller } from './baseController';
import { ClientPackets } from '../../../networkPackets/fromClient/clientPackets';
import { PacketMoveInput } from '../../../networkPackets/fromClient/moveInput';
import { Subject, BehaviorSubject } from 'rxjs';
import { Controllable } from '../entities/baseEntity';

export class ClientController implements Controller {
  private movementChanged$ = new BehaviorSubject<Phaser.Math.Vector2>(Phaser.Math.Vector2.ZERO);

  constructor(private socket: io.Socket, public controlledEntity: Controllable) {
    socket.on(ClientPackets.MOVE_INPUT, (p: PacketMoveInput) => {
      this.movementChanged$.next(new Phaser.Math.Vector2(p.moveX, p.moveY).normalize());
    });
  }

  get movement(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.movementChanged$.value);
  }

  get movementChanged() {
    return this.movementChanged$.asObservable();
  }

  get attack(): Phaser.Math.Vector2 {
    return null;
  }
}
