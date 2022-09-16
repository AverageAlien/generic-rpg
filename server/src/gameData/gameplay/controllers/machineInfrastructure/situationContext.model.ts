import { HumanoidEntity } from "../../entities/humanoidEntity";

export interface SituationContext {
  health: number;
  maxHealth: number;
  armor: number;
  speed: number;
  weaponCtx: WeaponContext;
}

export interface WeaponContext {
  damage: number;
  refire: number;
  reach: number;
  swing: number;
}

export interface TargetCandidate {
  entity: HumanoidEntity;
  distanceSq: number;
}