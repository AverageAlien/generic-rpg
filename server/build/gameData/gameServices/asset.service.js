export class AssetService {
    static loadBlockSprites(loader) {
        loader.image('grass01', 'assets/textures/blocks/grass01.png');
        loader.image('stone_wall01', 'assets/textures/blocks/stone_wall01.png');
        loader.image('stone_floor01', 'assets/textures/blocks/stone_floor01.png');
        loader.image('tileset', 'assets/textures/blocks/tileset-extruded.png');
    }
    static loadEntitySprites(loader) {
        loader.image('humanoid', 'assets/textures/entities/humanoid.png');
    }
    static loadArmorSprites(loader) {
        loader.image('leather_vest', 'assets/textures/items/armor/leather_vest.png');
        loader.image('leather_vest_outline', 'assets/textures/items/armor/leather_vest_outline.png');
    }
}
//# sourceMappingURL=asset.service.js.map