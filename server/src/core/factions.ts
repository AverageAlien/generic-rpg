export enum Faction {
  Player,
  Baddies
}

export function FactionsAreFriendly(fac1: Faction, fac2: Faction): boolean {
  if (fac1 === fac2) { return true; }

  return false;
}
