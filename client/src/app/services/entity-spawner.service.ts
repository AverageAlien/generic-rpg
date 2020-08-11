import { Injectable } from '@angular/core';
import { InputKeys } from '../models/inputKeys.model';
import { Level } from '../scenes/levelScene';
import { CharacterEntity } from '../gameplay/entities/characterEntity';
import { PlayerController } from '../gameplay/controllers/playerController';
import { Constants } from '../core/constants';
import { Faction } from '../core/factions';
import { WalkerController } from '../gameplay/controllers/walkerController';
import { UI } from '../ui/healthBarSmall';


@Injectable({
  providedIn: 'root',
})
export class EntitySpawnerService {
  private inputKeys: InputKeys;
  private levelScene: Level;

  public init(inputKeys: InputKeys, levelScene: Level) {
    this.inputKeys = inputKeys;
    this.levelScene = levelScene;
  }

  public spawnPlayer(playerName: string, position: Phaser.Math.Vector2, speed: number): CharacterEntity {
    const gameObject = this.createSpriteGameObject(position, 'humanoid');

    gameObject.body.setSize(20, 20).setOffset(1, 7);

    const entity = new CharacterEntity(playerName, gameObject, 100, 1, speed);
    entity.controller = new PlayerController(this.inputKeys);

    this.levelScene.entities.push(entity);

    return entity;
  }

  public spawnStalker(position: Phaser.Math.Vector2, speed: number): CharacterEntity {
    const gameObject = this.createSpriteGameObject(position, 'humanoid');

    const entity = new CharacterEntity('Stalker', gameObject, 100, 1, speed);
    entity.faction = Faction.Baddies;
    entity.controller = new WalkerController(entity, this.levelScene, 512);

    const healthBar = new UI.HealthBarSmall(this.levelScene, entity);

    entity.destroyed.subscribe(() => {
      const healthBarIndex = this.levelScene.levelUI.indexOf(healthBar);
      const entityIndex = this.levelScene.entities.indexOf(entity);

      healthBar.destroy();

      if (healthBarIndex >= 0) {
        this.levelScene.levelUI.splice(healthBarIndex, 1);
      }

      if (entityIndex >= 0) {
        this.levelScene.entities.splice(entityIndex, 1);
      }
    });

    this.levelScene.levelUI.push(healthBar);
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
    gameObject.setDepth(10);
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
