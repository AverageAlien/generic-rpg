export class AssetService {
  public static loadBlockSprites(loader: Phaser.Loader.LoaderPlugin): void {
    loader.image('grass01', 'assets/textures/blocks/grass01.png');
    loader.image('stone_wall01', 'assets/textures/blocks/stone_wall01.png');
    loader.image('stone_floor01', 'assets/textures/blocks/stone_floor01.png');
    loader.image('tileset', 'assets/textures/blocks/tileset-extruded.png');
  }

  public static loadEntitySprites(loader: Phaser.Loader.LoaderPlugin): void {
    loader.image('humanoid', 'assets/textures/entities/humanoid.png');
  }

  public static loadArmorSprites(loader: Phaser.Loader.LoaderPlugin): void {
    loader.image('leather_vest', 'assets/textures/items/armor/leather_vest.png');
    loader.image('leather_vest_outline', 'assets/textures/items/armor/leather_vest_outline.png');
  }
}