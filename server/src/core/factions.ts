export enum Faction {
  Player = 1,
  Baddies = 2,
  TeamA = 3,
  TeamB = 4,
  TeamC = 5
}

const ignorePlayerTeams = [Faction.TeamA, Faction.TeamB, Faction.TeamC];

export function FactionsAreFriendly(fac1: Faction, fac2: Faction): boolean {
  if (fac1 === fac2) { return true; }

  if (Math.min(fac1, fac2) === Faction.Player && ignorePlayerTeams.includes(Math.max(fac1, fac2))) {
    return true;
  }

  return false;
}
