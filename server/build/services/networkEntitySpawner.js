"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkEntitySpawner = void 0;
const uuid_1 = require("uuid");
const humanoidEntity_1 = require("../gameData/gameplay/entities/humanoidEntity");
const walkerController_1 = require("../gameData/gameplay/controllers/walkerController");
const constants_1 = require("../core/constants");
const factions_1 = require("../core/factions");
const clientController_1 = require("../gameData/gameplay/controllers/clientController");
const networkControllerService_1 = require("./networkControllerService");
class NetworkEntitySpawner {
    constructor(levelScene) {
        this.levelScene = levelScene;
    }
    spawnPlayer(gameClient, position) {
        const gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height));
        gameObject.body
            .setSize(constants_1.Constants.Character.COLLIDER_W, constants_1.Constants.Character.COLLIDER_H)
            .setOffset(constants_1.Constants.Character.COLLIDER_OFFSET_X, constants_1.Constants.Character.COLLIDER_OFFSET_Y);
        const entity = new humanoidEntity_1.HumanoidEntity({
            name: gameClient.nickname,
            gameObject,
            maxHealth: 100,
            level: 1,
            speed: 30,
            bodyTexture: 'humanoid'
        });
        entity.networkId = uuid_1.v4();
        entity.controller = new clientController_1.ClientController(gameClient.socket, entity);
        networkControllerService_1.NetworkControllerService.addPlayerInputListeners(entity.controller, this.levelScene);
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
        const gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height));
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
        entity.networkId = uuid_1.v4();
        entity.faction = factions_1.Faction.Baddies;
        entity.controller = new walkerController_1.WalkerController(entity, this.levelScene, 512);
        entity.destroyed.subscribe(() => {
            const entityIndex = this.levelScene.entities.indexOf(entity);
            if (entityIndex >= 0) {
                this.levelScene.entities.splice(entityIndex, 1);
            }
        });
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
        console.log(`render texture pos ${position.x}; ${position.y}`);
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
exports.NetworkEntitySpawner = NetworkEntitySpawner;
