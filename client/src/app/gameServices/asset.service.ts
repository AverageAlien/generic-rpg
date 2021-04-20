const texturesFolderUrl = 'assets/';

export class AssetService {
  public static loadBlockSprites(loader: Phaser.Loader.LoaderPlugin): void {
    loader.image('grass01', texturesFolderUrl + 'blocks/grass01.png');
    loader.image('stone_wall01', texturesFolderUrl + 'blocks/stone_wall01.png');
    loader.image('stone_floor01', texturesFolderUrl + 'blocks/stone_floor01.png');
    loader.image('tileset', texturesFolderUrl + 'blocks/tileset-extruded.png');
  }

  public static loadEntitySprites(loader: Phaser.Loader.LoaderPlugin): void {
    loader.image('humanoid', texturesFolderUrl + 'entities/humanoid.png');
  }

  public static loadArmorSprites(loader: Phaser.Loader.LoaderPlugin): void {
    // loader.image('leather_vest', texturesFolderUrl + 'items/armor/leather_vest.png');
    // loader.image('leather_vest_outline', texturesFolderUrl + 'items/armor/leather_vest_outline.png');
    // loader.image('steel_vest', texturesFolderUrl + 'items/armor/steel_vest.png');
    // loader.image('steel_vest_outline', texturesFolderUrl + 'items/armor/steel_vest_outline.png');
    // loader.image('steel_bowl', texturesFolderUrl + 'items/armor/steel_bowl.png');
    // loader.image('steel_bowl_outline', texturesFolderUrl + 'items/armor/steel_bowl_outline.png');

    this.addArmorItem(loader, 'leather_vest');
    this.addArmorItem(loader, 'steel_vest');
    this.addArmorItem(loader, 'steel_bowl');
    this.addArmorItem(loader, 'leather_boots');
  }

  private static addArmorItem(loader: Phaser.Loader.LoaderPlugin, itemName: string) {
    loader.image(itemName, texturesFolderUrl + 'items/armor/' + itemName + '.png');
    loader.image(itemName + '_outline', texturesFolderUrl + 'items/armor/' + itemName + '_outline.png');
  }
}
