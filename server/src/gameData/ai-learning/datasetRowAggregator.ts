import { MachineState } from '../gameplay/controllers/machineInfrastructure/machineStates';
import { HumanoidNearby, SituationContext } from '../gameplay/controllers/machineInfrastructure/situationContext.model';
import { DatasetRow } from './datasetBuilderService';

export class DatasetRowAggregator {
  static MakeDatasetRow(currentState: MachineState, previousState: MachineState, ctx: SituationContext): DatasetRow {
    const targetData = this.pullEntityDataSafe(ctx.target);
    const alliesData = ctx.nearbyAllies.map(a => this.pullEntityDataSafe(a));
    const enemiesData = ctx.nearbyEnemies.map(e => this.pullEntityDataSafe(e));
    const aggregatedAllies = this.aggregateEntitiesData(alliesData);
    const aggregatedEnemies = this.aggregateEntitiesData(enemiesData);

    return {
      currentState,
      previousState,

      health: ctx.health,
      maxHealth: ctx.maxHealth,
      armor: ctx.armor,
      speed: ctx.speed,
      weaponDamage: ctx.weaponCtx.damage,
      weaponReach: ctx.weaponCtx.reach,
      weaponRefire: ctx.weaponCtx.refire,
      weaponSwing: ctx.weaponCtx.swing,

      targetHealth: targetData.health,
      targetMaxHealth: targetData.maxHealth,
      targetArmor: targetData.armor,
      targetSpeed: targetData.speed,
      targetDamage: targetData.damage,
      targetReach: targetData.reach,
      targetRefire: targetData.refire,
      targetSwing: targetData.swing,
      targetDistanceSq: targetData.distanceSq,

      alliesCount: alliesData.length,
      alliesTotalHealth: aggregatedAllies.health,
      alliesTotalMaxHealth: aggregatedAllies.maxHealth,
      alliesAverageArmor: aggregatedAllies.armor,
      alliesAverageSpeed: aggregatedAllies.speed,
      alliesAverageDamage: aggregatedAllies.damage,
      alliesAverageReach: aggregatedAllies.reach,
      alliesAverageRefire: aggregatedAllies.refire,
      alliesAverageSwing: aggregatedAllies.swing,
      alliesAverageDistanceSq: aggregatedAllies.distanceSq,

      enemiesCount: enemiesData.length,
      enemiesTotalHealth: aggregatedEnemies.health,
      enemiesTotalMaxHealth: aggregatedEnemies.maxHealth,
      enemiesAverageArmor: aggregatedEnemies.armor,
      enemiesAverageSpeed: aggregatedEnemies.speed,
      enemiesAverageDamage: aggregatedEnemies.damage,
      enemiesAverageReach: aggregatedEnemies.reach,
      enemiesAverageRefire: aggregatedEnemies.refire,
      enemiesAverageSwing: aggregatedEnemies.swing,
      enemiesAverageDistanceSq: aggregatedEnemies.distanceSq
    }
  }

  private static pullEntityDataSafe(e?: HumanoidNearby): SafeEntityData {
    const equipment = e?.entity?.getEquipment() ?? null;
    const armor =
      (equipment?.helmet?.armor || 0)
      + (equipment?.bodyArmor?.armor || 0)
      + (equipment?.boots?.armor || 0);

    const weapon = {
      damage: equipment?.weapon?.damage.map(d => d.value).reduce((a, b) => a + b) || 0,
      reach: equipment?.weapon?.reach || 0,
      refire: equipment?.weapon?.refire || 0,
      swing: equipment?.weapon?.swing || 0
    };

    return {
      health: e?.entity?.health ?? 0,
      maxHealth: e?.entity?.maxHealth ?? 0,
      armor,
      speed: e?.entity?.speed,
      damage: weapon.damage,
      reach: weapon.reach,
      refire: weapon.refire,
      swing: weapon.swing,
      distanceSq: e?.distanceSq ?? 0
    };
  }

  private static aggregateEntitiesData(entities: SafeEntityData[]): SafeEntityData {
    if (entities.length === 0) {
      return {
        health: 0,
        maxHealth: 0,
        armor: 0,
        speed: 0,
        damage: 0,
        reach: 0,
        refire: 0,
        swing: 0,
        distanceSq: 0
      }
    }

    return {
      health: this.sum(entities, e => e.health),
      maxHealth: this.sum(entities, e => e.maxHealth),
      armor: this.average(entities, e => e.armor),
      speed: this.average(entities, e => e.speed),
      damage: this.average(entities, e => e.damage),
      reach: this.average(entities, e => e.reach),
      refire: this.average(entities, e => e.refire),
      swing: this.average(entities, e => e.swing),
      distanceSq: this.average(entities, e => e.distanceSq)
    }
  }

  private static sum(entities: SafeEntityData[], selector: (entity: SafeEntityData) => number): number {
    const total = entities.map(selector).reduce((p, c) => p + c);

    return total;
  }

  private static average(entities: SafeEntityData[], selector: (entity: SafeEntityData) => number): number {
    const total = entities.map(selector).reduce((p, c) => p + c);

    return total / entities.length;
  }
}

interface SafeEntityData {
  health: number
  maxHealth: number
  armor: number
  speed: number
  damage: number
  reach: number
  refire: number
  swing: number
  distanceSq: number
}