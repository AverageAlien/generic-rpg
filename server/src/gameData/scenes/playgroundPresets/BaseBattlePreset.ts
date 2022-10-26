import { NetworkEntitySpawner } from '../../../services/networkEntitySpawner';
import { DecisionTreeClassifierStateMachineController } from '../../gameplay/controllers/decisionTreeClassifierSMController';
import { StateMachineController } from '../../gameplay/controllers/stateMachineController';
import { HumanoidEntity } from '../../gameplay/entities/humanoidEntity';
import { Armor } from '../../gameplay/items/armor';
import { DamageType } from '../../gameplay/items/itemEnums';
import { Weapon } from '../../gameplay/items/weapon';
import { ArmorPresets } from '../../itemPresets/armorPresets';
import { WeaponPresets } from '../../itemPresets/weaponPresets';
import { NetworkLevel } from '../networkLevel';

export abstract class BaseBattlePreset {
  constructor(protected entitySpawner: NetworkEntitySpawner) {}

  abstract generateEntities(): HumanoidEntity[];

  addPositionOffset = (pos: Phaser.Math.Vector2) => pos;
  
  protected defaultStateMachineControllerFactory(entity: HumanoidEntity, levelScene: NetworkLevel, sightRange?: number)
    : StateMachineController {
    return new StateMachineController(entity, levelScene, sightRange);
  }

  protected decisionTreeStateMachineControllerFactory(entity: HumanoidEntity, levelScene: NetworkLevel, sightRange?: number) {
    return new DecisionTreeClassifierStateMachineController(entity, levelScene, sightRange);
  }

  protected randomizeArmor(): Armor[] {
    const armor = [];

    if (Math.random() > 0.5) {
      armor.push(ArmorPresets.boots.leatherBoots());
    }

    if (Math.random() > 0.7) {
      armor.push(ArmorPresets.helmets.steelBowl());
    }

    if (Math.random() > 0.9) {
      armor.push(ArmorPresets.chestplates.steelVest());
    }

    return armor;
  }

  protected randomizeSpeed(): number {
    return this.randomNum(8, 14);
  }

  protected randomizeMaxHealth(): number {
    return this.randomNum(100, 150);
  }

  protected randomizeSword(): Weapon {
    const weapon = WeaponPresets.shortSword();
    weapon.reach = this.randomNum(40, 55);
    weapon.damage = [
      {
        type: DamageType.Cut,
        value: this.randomNum(20, 35)
      }
    ]
    weapon.refire = this.randomNum(200, 300),
    weapon.swing = this.randomNum(25, 60);
    return weapon;
  }

  protected randomizeStick(): Weapon {
    const weapon = WeaponPresets.woodenStick();
    weapon.reach = this.randomNum(70, 140);
    weapon.damage = [
      {
        type: DamageType.Blunt,
        value: this.randomNum(10, 25)
      }
    ],
    weapon.refire = this.randomNum(280, 400);
    weapon.swing = this.randomNum(90, 180);
    return weapon;
  }

  protected randomNum(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}