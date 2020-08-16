"use strict";
exports.__esModule = true;
var Screen = /** @class */ (function () {
    function Screen() {
    }
    Screen.SCREEN_W = 800;
    Screen.SCREEN_H = 608;
    return Screen;
}());
var Level = /** @class */ (function () {
    function Level() {
    }
    Level.GRID_SIZE_X = 32;
    Level.GRID_SIZE_Y = 32;
    Level.CHUNK_W = 32; // in tiles
    Level.CHUNK_H = 32; // in tiles
    return Level;
}());
var Character = /** @class */ (function () {
    function Character() {
    }
    Character.MAX_SPEED_MULT = 5;
    Character.COLLIDER_W = 20;
    Character.COLLIDER_H = 20;
    Character.COLLIDER_OFFSET_X = 1;
    Character.COLLIDER_OFFSET_Y = 7;
    return Character;
}());
exports.Constants = {
    Screen: Screen,
    Level: Level,
    Character: Character
};
