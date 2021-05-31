const texturesFolderUrl = '../../../../../textures/';

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
    this.addArmorItem(loader, 'leather_vest');
    this.addArmorItem(loader, 'steel_vest');
    this.addArmorItem(loader, 'steel_bowl');
    this.addArmorItem(loader, 'leather_boots');

    this.addWeaponItem(loader, 'short_sword');
    this.addWeaponItem(loader, 'wooden_stick');
  }

  private static addArmorItem(loader: Phaser.Loader.LoaderPlugin, itemName: string) {
    loader.image(itemName, texturesFolderUrl + 'items/armor/' + itemName + '.png');
    loader.image(itemName + '_outline', texturesFolderUrl + 'items/armor/' + itemName + '_outline.png');
  }

  private static addWeaponItem(loader: Phaser.Loader.LoaderPlugin, itemName: string) {
    loader.image(itemName, texturesFolderUrl + 'items/weapons/' + itemName + '.png');
    loader.image(itemName + '_outline', texturesFolderUrl + 'items/weapons/' + itemName + '_icon.png');
  }
}
