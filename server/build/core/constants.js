"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
class Screen {
}
Screen.SCREEN_W = 800;
Screen.SCREEN_H = 608;
class Level {
}
Level.GRID_SIZE_X = 32;
Level.GRID_SIZE_Y = 32;
Level.CHUNK_W = 32; // in tiles
Level.CHUNK_H = 32; // in tiles
class Character {
}
Character.MAX_SPEED_MULT = 5;
Character.COLLIDER_W = 20;
Character.COLLIDER_H = 20;
Character.COLLIDER_OFFSET_X = 1;
Character.COLLIDER_OFFSET_Y = 7;
exports.Constants = {
    Screen,
    Level,
    Character
};
