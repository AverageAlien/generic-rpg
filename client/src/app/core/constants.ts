class Screen {
  static readonly SCREEN_W = 800;
  static readonly SCREEN_H = 608;
}

class Level {
  static readonly GRID_SIZE_X = 32;
  static readonly GRID_SIZE_Y = 32;
  static readonly CHUNK_W = 32; // in tiles
  static readonly CHUNK_H = 32; // in tiles
}

class Character {
  static readonly MAX_SPEED_MULT = 5;
  static readonly COLLIDER_W = 20;
  static readonly COLLIDER_H = 20;
  static readonly COLLIDER_OFFSET_X = 1 + 42 / 2; // (1 pixel - colliding margin, 42 = 64 - 22, 22 - humanoid sprite width)
  static readonly COLLIDER_OFFSET_Y = 7 + 36 / 2; // (7 pixel - colliding margin, 36 = 64 - 28, 28 - humanoid sprite height)
}

export const Constants = {
  Screen,
  Level,
  Character
};
