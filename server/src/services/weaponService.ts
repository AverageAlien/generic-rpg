import { FactionsAreFriendly } from '../core/factions';
import { PacketEntityAttacks } from '../networkPackets/fromServer/entityAttacks';
import { PacketEntityDamaged } from '../networkPackets/fromServer/entityDamaged';
import { ServerPackets } from '../networkPackets/fromServer/serverPackets';
import { DamageCalculationService } from './damageCalculationService';
import { Destroyable, Entity } from '../gameData/gameplay/entities/baseEntity';
import { CharacterEntity } from '../gameData/gameplay/entities/characterEntity';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { Weapon } from '../gameData/gameplay/items/weapon';
import { NetworkLevel } from '../gameData/scenes/networkLevel';

export class WeaponService {
  constructor(public levelScene: NetworkLevel) {}

  private scanHitArea(
    weapon: Weapon,
    attacker: Entity,
    attackAngle: number): Destroyable[] {
      const allEntities = this.levelScene.entities;

      const hitEntities = allEntities.filter(e => {
        // todo: add faction friends check
        if (e === attacker || !(e instanceof CharacterEntity) || FactionsAreFriendly(attacker.faction, e.faction)) {
          return false;
        }

        const attackerCenter = new Phaser.Math.Vector2(attacker.gameObject.body.center);
        const targetCenter = new Phaser.Math.Vector2(e.gameObject.body.center);

        const distanceSq = new Phaser.Math.Vector2(targetCenter).subtract(attackerCenter).lengthSq();

        if (distanceSq > weapon.reach ** 2) {
          return false;
        } else if (distanceSq <= (0.25 * weapon.reach) ** 2) {
          return true;
        }

        const angleToEntity = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(attackerCenter, targetCenter));

        const correctedAttackAngle = attackAngle - 90;


        let angleDiff = Math.abs(angleToEntity - correctedAttackAngle);
        angleDiff = Math.min(angleDiff, 360 - angleDiff);
        const swingResult = angleDiff <= weapon.swing / 2;

        return swingResult;
      }) as Destroyable[];

      return hitEntities;
  }

  public attackNetwork(attacker: HumanoidEntity, attackPoint: Phaser.Math.Vector2) {
    const attackAngle = 90 + Phaser.Math.RadToDeg(
      Phaser.Math.Angle.BetweenPoints(attacker.gameObject.body.center, attackPoint));
    const weapon = attacker.getEquipment().weapon;

    const targets = this.scanHitArea(weapon, attacker, attackAngle).filter(t => t instanceof HumanoidEntity) as HumanoidEntity[];

    targets.forEach(t => {
      const damage = DamageCalculationService.calculateHumanoidDamage(
        attacker,
        t as HumanoidEntity
      );

      this.levelScene.broadcastPacket(ServerPackets.ENTITY_DAMAGED, {
        networkId: t.networkId,
        damageAmount: damage
      } as PacketEntityDamaged);

      t.damage(damage);
    });

    this.levelScene.broadcastPacket(ServerPackets.ENTITY_ATTACKS, {
      attackPoint,
      attackerNetworkId: attacker.networkId
    } as PacketEntityAttacks);
  }
}
