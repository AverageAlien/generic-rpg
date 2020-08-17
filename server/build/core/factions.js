"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactionsAreFriendly = exports.Faction = void 0;
var Faction;
(function (Faction) {
    Faction[Faction["Player"] = 0] = "Player";
    Faction[Faction["Baddies"] = 1] = "Baddies";
})(Faction = exports.Faction || (exports.Faction = {}));
function FactionsAreFriendly(fac1, fac2) {
    if (fac1 === fac2) {
        return true;
    }
    return false;
}
exports.FactionsAreFriendly = FactionsAreFriendly;
