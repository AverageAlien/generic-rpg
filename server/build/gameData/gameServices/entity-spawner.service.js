import { PlayerController } from '../gameplay/controllers/playerController';
import { WalkerController } from '../gameplay/controllers/walkerController';
import { UI } from '../ui/ui';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { Constants } from '../../core/constants';
import { Faction } from '../../core/factions';
export class EntitySpawnerService {
    init(inputKeys, levelScene) {
        this.inputKeys = inputKeys;
        this.levelScene = levelScene;
    }
    spawnPlayer(playerName, position, speed) {
        const gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height)).setDepth(6);
        gameObject.body
            .setSize(Constants.Character.COLLIDER_W, Constants.Character.COLLIDER_H)
            .setOffset(Constants.Character.COLLIDER_OFFSET_X, Constants.Character.COLLIDER_OFFSET_Y);
        const entity = new HumanoidEntity({
            name: playerName,
            gameObject,
            maxHealth: 100,
            level: 1,
            speed,
            bodyTexture: 'humanoid'
        });
        entity.controller = new PlayerController(this.inputKeys);
        entity.destroyed.subscribe(() => {
            const entityIndex = this.levelScene.entities.indexOf(entity);
            if (entityIndex >= 0) {
                this.levelScene.entities.splice(entityIndex, 1);
            }
            console.log(this.levelScene.player);
        });
        this.levelScene.entities.push(entity);
        return entity;
    }
    spawnStalker(position, speed) {
        const gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height)).setDepth(3);
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
        entity.faction = Faction.Baddies;
        entity.controller = new WalkerController(entity, this.levelScene, 512);
        const healthBar = new UI.HealthBarSmall(this.levelScene, entity);
        const nameLabel = new UI.EntityHeader(this.levelScene, entity, false);
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
//# sourceMappingURL=entity-spawner.service.js.map