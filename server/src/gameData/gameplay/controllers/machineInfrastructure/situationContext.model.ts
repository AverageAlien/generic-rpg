import { HumanoidEntity } from '../../entities/humanoidEntity';

export interface SituationContext {
  health: number;
  maxHealth: number;
  armor: number;
  speed: number;
  weaponCtx: WeaponContext;

  target?: HumanoidNearby;
  nearbyEnemies: HumanoidNearby[];
  nearbyAllies: HumanoidNearby[];
}

export interface WeaponContext {
  damage: number;
  refire: number;
  reach: number;
  swing: number;
}

export interface HumanoidNearby {
  entity: HumanoidEntity;
  distanceSq: number;
}