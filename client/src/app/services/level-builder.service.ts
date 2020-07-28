import { Injectable } from '@angular/core';
import { Level } from '../scenes/levelScene';
import { WallBlock } from '../gameplay/statics/wallStatic';
import { Constants } from '../core/constants';

@Injectable({
  providedIn: 'root'
})
export class LevelBuilderService {
  private levelScene: Level;

  public init(levelScene: Level) {
    this.levelScene = levelScene;
  }

  public addWall(pos: Phaser.Math.Vector2, size: Phaser.Math.Vector2, color: number): WallBlock {
    const gameObject = this.createStaticRectangle(pos, size, color);

    const block = new WallBlock(gameObject);

    this.levelScene.statics.push(block);

    return block;
  }

  public addBrickWall(pos: Phaser.Math.Vector2): WallBlock {
    const gameObject = this.createStaticSprite(pos, 'wall01');

    const block = new WallBlock(gameObject);

    this.levelScene.statics.push(block);

    return block;
  }

  public addBrickWallRepeated(pos: Phaser.Math.Vector2, size: Phaser.Math.Vector2): WallBlock {
    const gameObject = this.createStaticTiledSprite(pos, size, 'wall01');

    const block = new WallBlock(gameObject);

    this.levelScene.statics.push(block);

    return block;
  }

  private createStaticRectangle(
    pos: Phaser.Math.Vector2,
    size: Phaser.Math.Vector2,
    color: number): Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.StaticBody } {
      let gameObject: Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.StaticBody };

      gameObject = this.levelScene.add.rectangle(
        pos.x * Constants.GRID_SIZE_X,
        pos.y * Constants.GRID_SIZE_Y,
        size.x * Constants.GRID_SIZE_X,
        size.y * Constants.GRID_SIZE_Y,
        color) as any;

      this.setupStaticPhysics(gameObject);

      return gameObject;
  }

  private createStaticTiledSprite(
    pos: Phaser.Math.Vector2,
    size: Phaser.Math.Vector2,
    texture: string): Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.StaticBody } {
      let gameObject: Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.StaticBody };

      gameObject = this.levelScene.add.tileSprite(
        pos.x * Constants.GRID_SIZE_X,
        pos.y * Constants.GRID_SIZE_Y,
        size.x * Constants.GRID_SIZE_X,
        size.y * Constants.GRID_SIZE_Y,
        texture) as any;

      this.setupStaticPhysics(gameObject);

      return gameObject;
  }

  private createStaticSprite(
    pos: Phaser.Math.Vector2,
    texture: string): Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.StaticBody } {
      let gameObject: Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.StaticBody };

      gameObject = this.levelScene.add.sprite(
        pos.x * Constants.GRID_SIZE_X,
        pos.y * Constants.GRID_SIZE_Y,
        texture) as any;

      this.setupStaticPhysics(gameObject);

      return gameObject;
  }

  private setupStaticPhysics(gameObject: Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.StaticBody }): void {
    this.levelScene.physics.add.existing(gameObject, true);
    this.levelScene.physics.add.collider(gameObject, this.levelScene.entities.map(e => e.gameObject));


    gameObject.body.checkCollision.up = true;
    gameObject.body.checkCollision.down = true;
    gameObject.body.checkCollision.left = true;
    gameObject.body.checkCollision.right = true;

    gameObject.body.immovable = true;
  }
}
