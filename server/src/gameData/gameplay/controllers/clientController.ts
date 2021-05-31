import { Controller } from './baseController';
import { ClientPackets } from '../../../networkPackets/fromClient/clientPackets';
import { PacketMoveInput } from '../../../networkPackets/fromClient/moveInput';
import { BehaviorSubject, fromEvent, Subject, Subscription } from 'rxjs';
import { Controllable } from '../entities/baseEntity';
import { GameClient } from '../../../models/gameClient';
import { PacketEquipArmor } from '../../../networkPackets/fromClient/equipArmor';
import { Armor } from '../items/armor';
import { Weapon } from '../items/weapon';
import { PacketEquipWeapon } from '../../../networkPackets/fromClient/equipWeapon';
import { PacketEntityAttack } from '../../../networkPackets/fromClient/entityAttack';

export class ClientController implements Controller {
  public subs: Subscription[] = [];
  private movementChanged$ = new BehaviorSubject<Phaser.Math.Vector2>(Phaser.Math.Vector2.ZERO);
  private attack$ = new Subject<PacketEntityAttack>();
  private equipArmor$ = new Subject<Armor>();
  private equipWeapon$ = new Subject<Weapon>();

  constructor(private client: GameClient, public controlledEntity: Controllable) {
    this.subs = [
      fromEvent<PacketMoveInput>(client.socket, ClientPackets.MOVE_INPUT)
        .subscribe(p => {
          this.movementChanged$.next(new Phaser.Math.Vector2(p.moveX, p.moveY).normalize());
        }),
      fromEvent<PacketEquipArmor>(client.socket, ClientPackets.EQUIP_ARMOR)
        .subscribe(p => {
          this.equipArmor$.next(p.armor);
        }),
      fromEvent<PacketEquipWeapon>(client.socket, ClientPackets.EQUIP_WEAPON)
        .subscribe(p => {
          this.equipWeapon$.next(p.weapon);
        }),
      fromEvent<PacketEntityAttack>(client.socket, ClientPackets.ENTITY_ATTACK)
        .subscribe(p => {
          console.log(`ATTACKED ${controlledEntity.gameObject.body}`);
          this.attack$.next(p);
        })
    ];

    client.socketSubscriptions.push(...this.subs);
  }

  get movement(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.movementChanged$.value);
  }

  get movementChanged() {
    return this.movementChanged$.asObservable();
  }

  get equipArmor() {
    return this.equipArmor$.asObservable();
  }

  get equipWeapon() {
    return this.equipWeapon$.asObservable();
  }

  get attack(): Phaser.Math.Vector2 {
    return null;
  }

  get attacked() {
    return this.attack$.asObservable();
  }
}
