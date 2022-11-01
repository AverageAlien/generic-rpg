import { Faction } from '../../core/factions';
import { BaseEventArgs } from './eventArgs.base';

export class DamageDealtEventArgs extends BaseEventArgs {
  faction: Faction;
  damageDealt: number;
  killed: boolean;

  public static eventName() {
    return 'DAMAGE_DEALT';
  }

  public constructor(init?: Partial<DamageDealtEventArgs>) {
    super();

    Object.assign(this, init);
  }
}