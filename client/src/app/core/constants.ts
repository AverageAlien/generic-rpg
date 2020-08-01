export class Constants {
  static Screen = class {
    static readonly SCREEN_W = 800;
    static readonly SCREEN_H = 608;
  };

  static Level = class {
    static readonly GRID_SIZE_X = 32;
    static readonly GRID_SIZE_Y = 32;
    static readonly CHUNK_W = 32; // in tiles
    static readonly CHUNK_H = 32; // in tiles
  };

  static Character = class {
    static readonly MAX_SPEED_MULT = 5;
  };
}
