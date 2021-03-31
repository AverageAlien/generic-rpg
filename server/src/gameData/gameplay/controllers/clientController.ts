import * as io from 'socket.io';
import { Controller } from './baseController';
import { ClientPackets } from '../../../networkPackets/fromClient/clientPackets';
import { PacketMoveInput } from '../../../networkPackets/fromClient/moveInput';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { Controllable } from '../entities/baseEntity';
import { GameClient } from '../../../models/gameClient';

export class ClientController implements Controller {
  private movementChanged$ = new BehaviorSubject<Phaser.Math.Vector2>(Phaser.Math.Vector2.ZERO);

  constructor(private client: GameClient, public controlledEntity: Controllable) {
    client.socketSubscriptions.push(fromEvent<PacketMoveInput>(client.socket, ClientPackets.MOVE_INPUT)
      .subscribe(p => {
        this.movementChanged$.next(new Phaser.Math.Vector2(p.moveX, p.moveY).normalize());
      }));
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
