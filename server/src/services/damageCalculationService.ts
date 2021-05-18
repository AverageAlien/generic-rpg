import { HumanoidEntity } from "../gameData/gameplay/entities/humanoidEntity";
import { DamageType } from "../gameData/gameplay/items/itemEnums";

const damageMultipliers = {
  [DamageType.Cut]: 0.8,
  [DamageType.Blunt]: 0.6,
  [DamageType.Pierce]: 0.4,
  [DamageType.Magic]: 0.1
}

export class DamageCalculationService {
  public static calculateHumanoidDamage(attacker: HumanoidEntity, target: HumanoidEntity) {
    const equipment = target.getEquipment();
    const armor = [equipment.helmet, equipment.bodyArmor, equipment.boots]
      .filter(a => !!a)
      .map(a => a.armor)
      .reduce((a, b) => a + b, 0);

    const weapon = attacker.getEquipment().weapon;
    const damages = weapon.damage
      .map(d => {
        const damageMult = damageMultipliers[d.type];

        // https://www.desmos.com/calculator/7o0g7u4aqu
        const resultDamage = Math.round((1 - damageMult) * d.value + Math.max(0, damageMult * d.value - armor));
        return resultDamage;
      });

    const totalDamage = damages.reduce((a, b) => a + b, 0);
    return totalDamage;
  }
}