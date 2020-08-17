"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientLevel = void 0;
const phaser_1 = require("phaser");
const entity_spawner_service_1 = require("../gameServices/entity-spawner.service");
const asset_service_1 = require("../gameServices/asset.service");
const ui_1 = require("../ui/ui");
const mapGrid_1 = require("../../core/mapGrid");
class ClientLevel extends phaser_1.Scene {
    constructor(inputService) {
        super({ key: 'level' });
        this.inputService = inputService;
        this.levelName = 'Default level';
        this.entities = [];
        this.levelUI = [];
    }
    create() {
        this.entitySpawner = new entity_spawner_service_1.EntitySpawnerService();
        this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);
        this.mapGrid = new mapGrid_1.MapGrid(this, 'tileset');
        this.player = this.entitySpawner.spawnPlayer('maxi', new Phaser.Math.Vector2(-17, -7), 30);
        this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);
        this.backgroundImage = this.add.tileSprite(0, 0, this.sys.game.canvas.width + 100, this.sys.game.canvas.height + 100, 'grass01');
        this.backgroundImage.setDepth(-50);
        this.debugGraphics = this.add.graphics().setDepth(2).setAlpha(0.75);
        this.events.on('postupdate', this.postupdate.bind(this));
        this.levelUI.push(new ui_1.UI.HealthBarPlayer(this));
    }
    preload() {
        asset_service_1.AssetService.loadBlockSprites(this.load);
        asset_service_1.AssetService.loadEntitySprites(this.load);
        asset_service_1.AssetService.loadArmorSprites(this.load);
    }
    update() {
        this.entities.forEach(e => e.update());
        this.backgroundImage.setPosition(this.cameras.main.worldView.centerX, this.cameras.main.worldView.centerY);
        this.backgroundImage.setTilePosition(this.cameras.main.worldView.centerX, this.cameras.main.worldView.centerY);
    }
    postupdate() {
        this.levelUI.forEach(ui => ui.update());
    }
}
exports.ClientLevel = ClientLevel;
