"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitySpawnerService = void 0;
const playerController_1 = require("../gameplay/controllers/playerController");
const walkerController_1 = require("../gameplay/controllers/walkerController");
const ui_1 = require("../ui/ui");
const humanoidEntity_1 = require("../gameplay/entities/humanoidEntity");
const constants_1 = require("../../core/constants");
const factions_1 = require("../../core/factions");
class EntitySpawnerService {
    init(inputKeys, levelScene) {
        this.inputKeys = inputKeys;
        this.levelScene = levelScene;
    }
    spawnPlayer(playerName, position, speed) {
        const gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height)).setDepth(6);
        gameObject.body
            .setSize(constants_1.Constants.Character.COLLIDER_W, constants_1.Constants.Character.COLLIDER_H)
            .setOffset(constants_1.Constants.Character.COLLIDER_OFFSET_X, constants_1.Constants.Character.COLLIDER_OFFSET_Y);
        const entity = new humanoidEntity_1.HumanoidEntity({
            name: playerName,
            gameObject,
            maxHealth: 100,
            level: 1,
            speed,
            bodyTexture: 'humanoid'
        });
        entity.controller = new playerController_1.PlayerController(this.inputKeys);
        entity.destroyed.subscribe(() => {
            const entityIndex = this.levelScene.entities.indexOf(entity);
            if (entityIndex >= 0) {
                this.levelScene.entities.splice(entityIndex, 1);
            }
        });
        this.levelScene.entities.push(entity);
        return entity;
    }
    spawnStalker(position, speed) {
        const gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height)).setDepth(3);
        gameObject.body
            .setSize(constants_1.Constants.Character.COLLIDER_W, constants_1.Constants.Character.COLLIDER_H)
            .setOffset(constants_1.Constants.Character.COLLIDER_OFFSET_X, constants_1.Constants.Character.COLLIDER_OFFSET_Y);
        const entity = new humanoidEntity_1.HumanoidEntity({
            name: 'Stalker',
            gameObject,
            maxHealth: 100,
            level: 1,
            speed,
            bodyTexture: 'humanoid'
        });
        entity.faction = factions_1.Faction.Baddies;
        entity.controller = new walkerController_1.WalkerController(entity, this.levelScene, 512);
        const healthBar = new ui_1.UI.HealthBarSmall(this.levelScene, entity);
        const nameLabel = new ui_1.UI.EntityHeader(this.levelScene, entity, false);
        entity.destroyed.subscribe(() => {
            healthBar.destroy();
            nameLabel.destroy();
            const healthBarIndex = this.levelScene.levelUI.indexOf(healthBar);
            if (healthBarIndex >= 0) {
                this.levelScene.levelUI.splice(healthBarIndex, 1);
            }
            const labelIndex = this.levelScene.levelUI.indexOf(nameLabel);
            if (labelIndex >= 0) {
                this.levelScene.levelUI.splice(labelIndex, 1);
            }
            const entityIndex = this.levelScene.entities.indexOf(entity);
            if (entityIndex >= 0) {
                this.levelScene.entities.splice(entityIndex, 1);
            }
        });
        this.levelScene.levelUI.push(healthBar);
        this.levelScene.levelUI.push(nameLabel);
        this.levelScene.entities.push(entity);
        return entity;
    }
    createSpriteGameObject(position, sprite) {
        let gameObject;
        gameObject = this.levelScene.add.sprite(position.x * constants_1.Constants.Level.GRID_SIZE_X, position.y * constants_1.Constants.Level.GRID_SIZE_Y, sprite);
        return this.setupPhysics(gameObject);
    }
    createRenderTexture(position, size) {
        let gameObject;
        gameObject = this.levelScene.add.renderTexture(position.x * constants_1.Constants.Level.GRID_SIZE_X, position.y * constants_1.Constants.Level.GRID_SIZE_Y, size.x, size.y);
        return this.setupPhysics(gameObject);
    }
    setupPhysics(gameObject) {
        this.levelScene.physics.add.existing(gameObject);
        this.levelScene.physics.add.collider(gameObject, this.levelScene.mapGrid.getAllChunks());
        gameObject.body.checkCollision.up = true;
        gameObject.body.checkCollision.down = true;
        gameObject.body.checkCollision.left = true;
        gameObject.body.checkCollision.right = true;
        gameObject.body.useDamping = true;
        gameObject.body.setDrag(0.85, 0.85);
        return gameObject;
    }
}
exports.EntitySpawnerService = EntitySpawnerService;
