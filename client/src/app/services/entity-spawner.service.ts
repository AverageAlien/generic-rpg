import { Injectable } from '@angular/core';
import { Entity } from '../gameplay/entities/baseEntity';
import { InputKeys } from '../models/inputKeys.model';
import { Level } from '../scenes/levelScene';
import { CharacterEntity } from '../gameplay/entities/characterEntity';
import { PlayerController } from '../gameplay/controllers/playerController';
import { Constants } from '../core/constants';

@Injectable({
  providedIn: 'root'
})
export class EntitySpawnerService {
  private inputKeys: InputKeys;
  private levelScene: Level;

  public init(inputKeys: InputKeys, levelScene: Level) {
    this.inputKeys = inputKeys;
    this.levelScene = levelScene;
  }

  public spawnPlayer(playerName: string, position: Phaser.Math.Vector2, speed: number): CharacterEntity {
    const gameObject = this.createGameObject(position);

    const entity = new CharacterEntity(
      playerName,
      gameObject,
      100,
      1,
      speed
    );

    entity.controller = new PlayerController(this.inputKeys);

    this.levelScene.entities.push(entity);

    return entity;
  }

  private createGameObject(position: Phaser.Math.Vector2): Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body } {
    let gameObject: Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body };

    gameObject = this.levelScene.add.rectangle(
      position.x * Constants.GRID_SIZE_X,
      position.y * Constants.GRID_SIZE_Y,
      20, 20, 0xff0000) as any;
    this.levelScene.physics.add.existing(gameObject);
    this.levelScene.physics.add.collider(gameObject, this.levelScene.statics.map(e => e.gameObject));

    gameObject.body.checkCollision.up = true;
    gameObject.body.checkCollision.down = true;
    gameObject.body.checkCollision.left = true;
    gameObject.body.checkCollision.right = true;

    gameObject.body.useDamping = true;
    gameObject.body.setDrag(0.85, 0.85);

    return gameObject;
  }
}
