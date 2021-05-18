import { FactionsAreFriendly } from '../core/factions';
import { WeaponSwingEffect } from '../gameplay/effects/weaponSwing';
import { Destroyable, Entity } from '../gameplay/entities/baseEntity';
import { CharacterEntity } from '../gameplay/entities/characterEntity';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { Weapon } from '../gameplay/items/weapon';
import { ClientLevel } from '../scenes/clientLevel';
import { NetworkingService } from '../services/networking.service';

export class WeaponService {
  private static levelScene: ClientLevel;
  private static networkingService: NetworkingService;

  public static init(level: ClientLevel, networkingService: NetworkingService) {
    this.levelScene = level;
    this.networkingService = networkingService;
  }

  public static scanHitArea(
    weapon: Weapon,
    attacker: Entity,
    attackAngle: number): Destroyable[] {
      const allEntities = this.levelScene.entities;

      const hitEntities = allEntities.filter(e => {
        if (e === attacker || !(e instanceof CharacterEntity)) {
          return false;
        }

        const attackerCenter = new Phaser.Math.Vector2(attacker.gameObject.body.center);
        const targetCenter = new Phaser.Math.Vector2(e.gameObject.body.center);

        const distanceSq = new Phaser.Math.Vector2(targetCenter).subtract(attackerCenter).lengthSq();

        if (distanceSq > weapon.reach ** 2) {
          console.log(`FAIL ON DISTANCE ${distanceSq}`);
          return false;
        } else if (distanceSq <= (0.25 * weapon.reach) ** 2) {
          console.log(`SUCCESS TOO CLOSE`);
          return true;
        }

        const angleToEntity = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(attackerCenter, targetCenter));

        const angleDiff = Phaser.Math.Angle.ShortestBetween(angleToEntity, attackAngle - 90);
        const swingResult = angleDiff <= weapon.swing / 2;

        return swingResult;
      }) as Destroyable[];

      return hitEntities;
  }

  public static attackNetwork(attacker: HumanoidEntity, attackPoint: Phaser.Math.Vector2) {
    const attackAngle = 90 + Phaser.Math.RadToDeg(
      Phaser.Math.Angle.BetweenPoints(attacker.gameObject.body.center, attackPoint));
    const weapon = attacker.getEquipment().weapon;

    const effect = new WeaponSwingEffect(
      weapon,
      attacker.gameObject.body.center.x,
      attacker.gameObject.body.center.y,
      attackAngle,
      attacker.gameObject
    );

    const hitTargets = WeaponService.scanHitArea(weapon, attacker, attackAngle);

    console.log(`ATTACKED: ${hitTargets.length} TARGETS`);
    this.networkingService.sendAttackMelee(hitTargets, attackPoint);
  }

  public static attackLocal(attacker: HumanoidEntity, attackPoint: Phaser.Math.Vector2) {
    const attackAngle = 90 + Phaser.Math.RadToDeg(
      Phaser.Math.Angle.BetweenPoints(attacker.gameObject.body.center, attackPoint));
    const weapon = attacker.getEquipment().weapon;

    const effect = new WeaponSwingEffect(
      weapon,
      attacker.gameObject.body.center.x,
      attacker.gameObject.body.center.y,
      attackAngle,
      attacker.gameObject
    );
  }
}
