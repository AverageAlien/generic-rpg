export var Faction;
(function (Faction) {
    Faction[Faction["Player"] = 0] = "Player";
    Faction[Faction["Baddies"] = 1] = "Baddies";
})(Faction || (Faction = {}));
export function FactionsAreFriendly(fac1, fac2) {
    if (fac1 === fac2) {
        return true;
    }
    return false;
}
//# sourceMappingURL=factions.js.map