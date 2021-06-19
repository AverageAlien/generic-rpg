import { Controller } from './baseController';
import { Entity } from '../entities/baseEntity';
import { NetworkingService } from 'src/app/services/networking.service';
import { filter } from 'rxjs/operators';
import { WeaponService } from 'src/app/gameServices/weapon.service';
import { HumanoidEntity } from '../entities/humanoidEntity';

export class NetworkController implements Controller {
  private currentMovement = Phaser.Math.Vector2.ZERO;
  private currentAttack: Phaser.Math.Vector2 = null;

  constructor(public parentEntity: Entity, networkingService: NetworkingService) {
    networkingService.playerInputMove
      .pipe(filter(packet => packet.networkId === parentEntity.networkId))
      .subscribe(packet => {
        this.currentMovement = new Phaser.Math.Vector2(packet.moveX, packet.moveY);
      });

    networkingService.entityAttacks
      .pipe(filter(packet => packet.attackerNetworkId === parentEntity.networkId))
      .subscribe(packet => {
        WeaponService.attackLocal(parentEntity as HumanoidEntity, new Phaser.Math.Vector2(packet.attackPoint));
      });
  }

  public get movement(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.currentMovement);
  }

  public get attack(): Phaser.Math.Vector2 {
    const atk = this.currentAttack;
    this.currentAttack = null;
    return atk;
  }
}
