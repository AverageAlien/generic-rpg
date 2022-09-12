import { Armor } from '../gameplay/items/armor';
import { ArmorType } from '../gameplay/items/itemEnums';

export const ArmorPresets = {
  chestplates: {
    steelVest: new Armor({
      name: 'Steel vest',
      texture: 'steel_vest',
      armorType: ArmorType.Chestplate,
      armor: 100
    })
  },

  helmets: {
    steelBowl: new Armor({
      name: 'Steel bowl',
      texture: 'steel_bowl',
      armorType: ArmorType.Helmet,
      armor: 40
    })
  },

  boots: {
    leatherBoots: new Armor({
      name: 'Leather boots',
      texture: 'leather_boots',
      armorType: ArmorType.Boots,
      armor: 15
    })
  }
}