import { Controller } from './baseController';
import { Entity } from '../entities/baseEntity';
import { NetworkingService } from 'src/app/services/networking.service';
import { filter } from 'rxjs/operators';

export class NetworkController implements Controller {
  private currentMovement = Phaser.Math.Vector2.ZERO;

  constructor(public parentEntity: Entity, networkingService: NetworkingService) {
    networkingService.playerInputMove
      .pipe(filter(packet => packet.networkId === parentEntity.networkId))
      .subscribe(packet => {
        // console.log(`movement packet: ${packet.moveX}; ${packet.moveY}`);
        this.currentMovement = new Phaser.Math.Vector2(packet.moveX, packet.moveY);
      });
  }

  public get movement(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.currentMovement);
  }

  public get attack(): Phaser.Math.Vector2 {
    return null;
  }
}
