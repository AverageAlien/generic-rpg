"use strict";
exports.__esModule = true;
var AssetService = /** @class */ (function () {
    function AssetService() {
    }
    AssetService.loadBlockSprites = function (loader) {
        loader.image('grass01', 'assets/textures/blocks/grass01.png');
        loader.image('stone_wall01', 'assets/textures/blocks/stone_wall01.png');
        loader.image('stone_floor01', 'assets/textures/blocks/stone_floor01.png');
        loader.image('tileset', 'assets/textures/blocks/tileset-extruded.png');
    };
    AssetService.loadEntitySprites = function (loader) {
        loader.image('humanoid', 'assets/textures/entities/humanoid.png');
    };
    AssetService.loadArmorSprites = function (loader) {
        loader.image('leather_vest', 'assets/textures/items/armor/leather_vest.png');
        loader.image('leather_vest_outline', 'assets/textures/items/armor/leather_vest_outline.png');
    };
    return AssetService;
}());
exports.AssetService = AssetService;
