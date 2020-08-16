import { Controller } from './baseController';
import { Entity } from '../entities/baseEntity';
import { NetworkingService } from 'src/app/services/networking.service';
import { filter } from 'rxjs/operators';

export class NetworkController implements Controller {
  private currentMovement = Phaser.Math.Vector2.ZERO;

  constructor(public parentEntity: Entity, private networkingService: NetworkingService) {
    networkingService.playerInputMove
      .pipe(filter(packet => packet.networkId === parentEntity.networkId))
      .subscribe(packet => {
        this.currentMovement = packet.moveVector;
      });
  }

  public get movement(): Phaser.Math.Vector2 {
    return this.currentMovement;
  }

  public get attack(): Phaser.Math.Vector2 {
    return null;
  }
}
