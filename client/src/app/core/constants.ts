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
}

export const Constants = {
  Screen,
  Level,
  Character
};
