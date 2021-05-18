import { v4 as UUID } from 'uuid';
import { NetworkLevel } from '../gameData/scenes/networkLevel';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { WalkerController } from '../gameData/gameplay/controllers/walkerController';
import { GameClient } from '../models/gameClient';
import { Constants } from '../core/constants';
import { Faction } from '../core/factions';
import { ClientController } from '../gameData/gameplay/controllers/clientController';
import { NetworkControllerService } from './networkControllerService';
import { ServerWrapperController } from '../gameData/gameplay/controllers/serverWrapperController';

export class NetworkEntitySpawner {
  constructor(private levelScene: NetworkLevel) {}

  public spawnPlayer(gameClient: GameClient, position: Phaser.Math.Vector2): HumanoidEntity {
    const gameObject = this.createRenderTexture(
      position,
      new Phaser.Math.Vector2(
        this.levelScene.textures.getFrame('humanoid', 0).width,
        this.levelScene.textures.getFrame('humanoid', 0).height
      )
    )
    .setOrigin(0.5, 0.5);

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
    entity.controller = new ClientController(gameClient, entity);
    NetworkControllerService.addPlayerInputListeners(entity.controller as ClientController, this.levelScene);

    entity.destroyed.subscribe(() => {
      const entityIndex = this.levelScene.entities.indexOf(entity);

      if (entityIndex >= 0) {
        this.levelScene.entities.splice(entityIndex, 1);
      }
    });

    this.levelScene.entities.push(entity);

    return entity;
  }

  public spawnStalker(position: Phaser.Math.Vector2, speed: number): HumanoidEntity {
    const gameObject = this.createRenderTexture(
      position,
      new Phaser.Math.Vector2(
        this.levelScene.textures.getFrame('humanoid', 0).width,
        this.levelScene.textures.getFrame('humanoid', 0).height
      )
    )
    .setOrigin(0.5, 0.5);

    gameObject.body
      .setSize(Constants.Character.COLLIDER_W, Constants.Character.COLLIDER_H)
      .setOffset(Constants.Character.COLLIDER_OFFSET_X, Constants.Character.COLLIDER_OFFSET_Y);

    const entity = new HumanoidEntity({
      name: 'Stalker',
      gameObject,
      maxHealth: 20000,
      level: 1,
      speed,
      bodyTexture: 'humanoid'
    });

    entity.networkId = UUID();
    entity.faction = Faction.Baddies;

    entity.controller = new ServerWrapperController(new WalkerController(entity, this.levelScene, 0), entity);
    NetworkControllerService.addServerBotInputListeners(entity.controller as ServerWrapperController, this.levelScene);

    entity.destroyed.subscribe(() => {
      const entityIndex = this.levelScene.entities.indexOf(entity);
      if (entityIndex >= 0) {
        this.levelScene.entities.splice(entityIndex, 1);
      }
    });

    this.levelScene.entities.push(entity);

    return entity;
  }

  private createSpriteGameObject(
    position: Phaser.Math.Vector2,
    sprite: string
  ): Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body } {
    let gameObject: Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body };

    gameObject = this.levelScene.add.sprite(
      position.x * Constants.Level.GRID_SIZE_X,
      position.y * Constants.Level.GRID_SIZE_Y,
      sprite
    ) as any;

    return this.setupPhysics(gameObject);
  }

  private createRenderTexture(
    position: Phaser.Math.Vector2,
    size: Phaser.Math.Vector2
  ): Phaser.GameObjects.RenderTexture & { body: Phaser.Physics.Arcade.Body } {
    let gameObject: Phaser.GameObjects.RenderTexture & { body: Phaser.Physics.Arcade.Body };
    console.log(`render texture pos ${position.x}; ${position.y}`);

    gameObject = this.levelScene.add.renderTexture(
      position.x * Constants.Level.GRID_SIZE_X,
      position.y * Constants.Level.GRID_SIZE_Y,
      size.x,
      size.y
    ) as any;

    return this.setupPhysics(gameObject);
  }

  private setupPhysics<T extends Phaser.GameObjects.GameObject>(
    gameObject: T & { body: Phaser.Physics.Arcade.Body }
  ): T & { body: Phaser.Physics.Arcade.Body } {
    this.levelScene.physics.add.existing(gameObject);
    this.levelScene.physics.add.collider(
      gameObject,
      this.levelScene.mapGrid.getAllChunks()
    );

    gameObject.body.checkCollision.up = true;
    gameObject.body.checkCollision.down = true;
    gameObject.body.checkCollision.left = true;
    gameObject.body.checkCollision.right = true;

    gameObject.body.useDamping = true;
    gameObject.body.setDrag(0.85, 0.85);

    return gameObject;
  }
}
