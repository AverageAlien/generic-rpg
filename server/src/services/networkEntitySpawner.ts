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
import { PlayerDataSnapshot } from '../models/userDataSnapshot';
import { ServerPackets } from '../networkPackets/fromServer/serverPackets';
import { PacketEntityDied } from '../networkPackets/fromServer/entityDied';
import { SpawnWarriorConfig } from '../gameData/models/spawnWarriorConfig.model';
import { StateMachineController } from '../gameData/gameplay/controllers/stateMachineController';

export class NetworkEntitySpawner {
  constructor(private levelScene: NetworkLevel) {}

  public spawnPlayer(gameClient: GameClient, playerData: PlayerDataSnapshot, position: Phaser.Math.Vector2): HumanoidEntity {
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
      maxHealth: playerData.maxHealth,
      level: playerData.level,
      speed: playerData.speed,
      bodyTexture: 'humanoid'
    });

    entity.networkId = UUID();
    entity.faction = Faction.Player;
    entity.controller = new ClientController(gameClient, entity);

    if (!!playerData.equipment.weapon) entity.equipWeapon(playerData.equipment.weapon);
    if (!!playerData.equipment.helmet) entity.equipArmor(playerData.equipment.helmet);
    if (!!playerData.equipment.armor) entity.equipArmor(playerData.equipment.armor);
    if (!!playerData.equipment.boots) entity.equipArmor(playerData.equipment.boots);

    NetworkControllerService.addPlayerInputListeners(entity.controller as ClientController, this.levelScene);

    entity.destroyed.subscribe(() => {
      const entityIndex = this.levelScene.entities.indexOf(entity);

      if (entityIndex >= 0) {
        this.levelScene.entities.splice(entityIndex, 1);
      }

      (entity.controller as ClientController).subs.forEach(s => s.unsubscribe());
      this.levelScene.broadcastPacket(ServerPackets.ENTITY_DIED, { networkId: entity.networkId } as PacketEntityDied);
    });

    this.levelScene.entities.push(entity);

    return entity;
  }

  public spawnWarrior(position: Phaser.Math.Vector2, cfg: SpawnWarriorConfig): HumanoidEntity {
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
      name: cfg.name || 'Warrior',
      gameObject,
      maxHealth: cfg.maxHealth || 100,
      level: cfg.level || 1,
      speed: cfg.speed || 10,
      bodyTexture: 'humanoid'
    });

    entity.networkId = UUID();
    entity.faction = cfg.faction || Faction.Baddies;

    entity.controller = new ServerWrapperController(this.levelScene,
      new StateMachineController(entity, this.levelScene, cfg.sightRange),
      entity);
    NetworkControllerService.addServerBotInputListeners(entity.controller as ServerWrapperController, this.levelScene);

    entity.destroyed.subscribe(() => {
      const entityIndex = this.levelScene.entities.indexOf(entity);
      if (entityIndex >= 0) {
        this.levelScene.entities.splice(entityIndex, 1);
      }

      this.levelScene.broadcastPacket(ServerPackets.ENTITY_DIED, { networkId: entity.networkId } as PacketEntityDied);
    });

    entity.equipWeapon(cfg.weapon);
    cfg.armor?.forEach(a => entity.equipArmor(a));

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
      maxHealth: 110,
      level: 1,
      speed,
      bodyTexture: 'humanoid'
    });

    entity.networkId = UUID();
    entity.faction = Faction.Baddies;

    entity.controller = new ServerWrapperController(this.levelScene, new StateMachineController(entity, this.levelScene, 128), entity);
    NetworkControllerService.addServerBotInputListeners(entity.controller as ServerWrapperController, this.levelScene);

    entity.destroyed.subscribe(() => {
      const entityIndex = this.levelScene.entities.indexOf(entity);
      if (entityIndex >= 0) {
        this.levelScene.entities.splice(entityIndex, 1);
      }

      this.levelScene.broadcastPacket(ServerPackets.ENTITY_DIED, { networkId: entity.networkId } as PacketEntityDied);
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
