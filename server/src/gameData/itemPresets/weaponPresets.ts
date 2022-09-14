import { DamageType } from '../gameplay/items/itemEnums';
import { Weapon } from '../gameplay/items/weapon';

export const WeaponPresets = {
  shortSword: () => new Weapon({
    name: 'Short sword',
    texture: 'short_sword',
    damage: [
      {
        type: DamageType.Cut,
        value: 30
      }
    ],
    reach: 32,
    refire: 250,
    swing: 30
  }),
  woodenStick: () => new Weapon({
    name: 'Wooden stick',
    description: 'An old wooden stick to hit people with',
    texture: 'wooden_stick',
    damage: [
      {
        value: 5,
        type: DamageType.Blunt
      }
    ],
    level: 1,
    mass: 5,
    price: 5,
    reach: 64,
    refire: 250,
    swing: 120
  })
}