import { Injectable } from '@angular/core';
import { Entity } from '../gameplay/entities/baseEntity';
import { InputKeys } from '../models/inputKeys.model';
import { Level } from '../scenes/levelScene';
import { CharacterEntity } from '../gameplay/entities/characterEntity';
import { PlayerController } from '../gameplay/controllers/playerController';
import { Constants } from '../core/constants';
import { Faction } from '../core/factions';
import { StalkerController } from '../gameplay/controllers/stalkerController';

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

    gameObject.body.setSize(20, 20).setOffset(0, 6);

    const entity = new CharacterEntity(playerName, gameObject, 100, 1, speed);
    entity.controller = new PlayerController(this.inputKeys);

    this.levelScene.entities.push(entity);

    return entity;
  }

  public spawnStalker(position: Phaser.Math.Vector2, speed: number): CharacterEntity {
    const gameObject = this.createRectGameObject(position, 0x0000ff);

    const entity = new CharacterEntity('Stalker', gameObject, 100, 1, speed);
    entity.faction = Faction.Baddies;
    entity.controller = new StalkerController(entity, this.levelScene);

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
      this.levelScene.mapGrid.getAll().map(s => s.gameObject)
    );

    gameObject.body.checkCollision.up = true;
    gameObject.body.checkCollision.down = true;
    gameObject.body.checkCollision.left = true;
    gameObject.body.checkCollision.right = true;

    gameObject.body.useDamping = true;
    gameObject.body.setDrag(0.85, 0.85);

    return gameObject;
  }

  private createRectGameObject(
    position: Phaser.Math.Vector2,
    color: number
  ): Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body } {
    let gameObject: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };

    gameObject = this.levelScene.add.rectangle(
      position.x * Constants.Level.GRID_SIZE_X,
      position.y * Constants.Level.GRID_SIZE_Y,
      20,
      20,
      color
    ) as any;
    gameObject.setDepth(10);
    this.levelScene.physics.add.existing(gameObject);
    this.levelScene.physics.add.collider(
      gameObject,
      this.levelScene.mapGrid.getAll().map(s => s.gameObject)
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
