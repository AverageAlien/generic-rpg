import { v4 as UUID } from 'uuid';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { WalkerController } from '../gameData/gameplay/controllers/walkerController';
import { Constants } from '../core/constants';
import { Faction } from '../core/factions';
import { ClientController } from '../gameData/gameplay/controllers/clientController';
import { NetworkControllerService } from './networkControllerService';
export class NetworkEntitySpawner {
    constructor(levelScene) {
        this.levelScene = levelScene;
    }
    spawnPlayer(gameClient, position) {
        const gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height));
        gameObject.body
            .setSize(Constants.Character.COLLIDER_W, Constants.Character.COLLIDER_H)
            .setOffset(Constants.Character.COLLIDER_OFFSET_X, Constants.Character.COLLIDER_OFFSET_Y);
        const entity = new HumanoidEntity({
            name: gameClient.nickname,
            gameObject,
            maxHealth: 100,
            level: 1,
            speed: 30,
            bodyTexture: 'humanoid'
        });
        entity.networkId = UUID();
        entity.controller = new ClientController(gameClient.socket, entity);
        NetworkControllerService.addPlayerInputListeners(entity.controller, this.levelScene);
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
            .setSize(Constants.Character.COLLIDER_W, Constants.Character.COLLIDER_H)
            .setOffset(Constants.Character.COLLIDER_OFFSET_X, Constants.Character.COLLIDER_OFFSET_Y);
        const entity = new HumanoidEntity({
            name: 'Stalker',
            gameObject,
            maxHealth: 100,
            level: 1,
            speed,
            bodyTexture: 'humanoid'
        });
        entity.networkId = UUID();
        entity.faction = Faction.Baddies;
        entity.controller = new WalkerController(entity, this.levelScene, 512);
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
        gameObject = this.levelScene.add.sprite(position.x * Constants.Level.GRID_SIZE_X, position.y * Constants.Level.GRID_SIZE_Y, sprite);
        return this.setupPhysics(gameObject);
    }
    createRenderTexture(position, size) {
        let gameObject;
        gameObject = this.levelScene.add.renderTexture(position.x * Constants.Level.GRID_SIZE_X, position.y * Constants.Level.GRID_SIZE_Y, size.x, size.y);
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
//# sourceMappingURL=networkEntitySpawner.js.map