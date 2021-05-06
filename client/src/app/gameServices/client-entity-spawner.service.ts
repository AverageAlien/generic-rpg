import { InputKeys } from '../models/inputKeys.model';
import { ClientLevel } from '../scenes/clientLevel';
import { PlayerController } from '../gameplay/controllers/playerController';
import { Constants } from '../core/constants';
import { UI } from '../ui/ui';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { NetworkingService } from '../services/networking.service';
import { PacketSpawnPlayer } from '../networking/networkPackets/fromServer/spawnPlayer';
import { PacketSpawnEntityHumanoid } from '../networking/networkPackets/fromServer/spawnEntity';
import { NetworkController } from '../gameplay/controllers/networkController';


export class ClientEntitySpawnerService {
  constructor(
    private inputKeys: InputKeys,
    private levelScene: ClientLevel,
    private networkingService: NetworkingService
  ) {
    networkingService.spawnPlayer.subscribe(packet => {
      this.spawnPlayer(packet);
    });

    networkingService.spawnEntityHumanoid.subscribe(packet => {
      this.spawnEntityHumanoid(packet);
    });
  }

  public spawnPlayer(packet: PacketSpawnPlayer) {
    const gameObject = this.createRenderTexture(
      new Phaser.Math.Vector2(packet.positionX, packet.positionY),
      new Phaser.Math.Vector2(
        this.levelScene.textures.getFrame('humanoid', 0).width,
        this.levelScene.textures.getFrame('humanoid', 0).height
      )
    ).setDepth(6)
    .setOrigin(0.5, 0.5);

    gameObject.body
      .setSize(Constants.Character.COLLIDER_W, Constants.Character.COLLIDER_H)
      .setOffset(Constants.Character.COLLIDER_OFFSET_X, Constants.Character.COLLIDER_OFFSET_Y);

    const entity = new HumanoidEntity({
      name: packet.entityName,
      gameObject,
      maxHealth: packet.maxHealth,
      level: packet.level,
      speed: packet.speed,
      bodyTexture: 'humanoid',
      helmet: packet.helmet,
      bodyArmor: packet.bodyArmor,
      boots: packet.boots,
      weapon: packet.weapon,
    });

    entity.networkId = packet.networkId;
    entity.faction = packet.faction;
    entity.health = packet.health;

    entity.controller = new PlayerController(this.inputKeys, this.networkingService);

    (entity.controller as PlayerController).movementChanged.subscribe(vector => {
      this.networkingService.sendMovement(vector);
    });

    // entity.destroyed.subscribe(() => {
    //   // TODO
    // });

    this.levelScene.entities.push(entity);
    this.levelScene.player = entity;

    this.levelScene.cameras.main.startFollow(entity.gameObject,
      false,
      0.1,
      0.1);

    return entity;
  }

  public spawnEntityHumanoid(packet: PacketSpawnEntityHumanoid): HumanoidEntity {
    const gameObject = this.createRenderTexture(
      new Phaser.Math.Vector2(packet.positionX, packet.positionY),
      new Phaser.Math.Vector2(
        this.levelScene.textures.getFrame('humanoid', 0).width,
        this.levelScene.textures.getFrame('humanoid', 0).height
      )
    ).setDepth(3)
    .setOrigin(0.5, 0.5);

    gameObject.body
      .setSize(Constants.Character.COLLIDER_W, Constants.Character.COLLIDER_H)
      .setOffset(Constants.Character.COLLIDER_OFFSET_X, Constants.Character.COLLIDER_OFFSET_Y);

    const entity = new HumanoidEntity({
      name: packet.entityName,
      gameObject,
      maxHealth: packet.health,
      level: packet.level,
      speed: packet.speed,
      bodyTexture: 'humanoid',
      helmet: packet.helmet,
      bodyArmor: packet.bodyArmor,
      boots: packet.boots,
      weapon: packet.weapon,
    });

    entity.faction = packet.faction;
    entity.health = packet.health;
    entity.networkId = packet.networkId;
    entity.controller = new NetworkController(entity, this.networkingService);

    const healthBar = new UI.HealthBarSmall(this.levelScene, entity);
    const nameLabel = new UI.EntityHeader(this.levelScene, entity, true);

    entity.destroyed.subscribe(() => {
      console.log('whoops destroyed');
      // TODO ????????
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
    const allChunks = this.levelScene.mapGrid.getAllChunks();
    this.levelScene.physics.add.collider(
      gameObject,
      allChunks
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
