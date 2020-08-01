import { Level } from '../scenes/levelScene';
import { Constants } from './constants';
import { BlockType, Blocks, BlockInfo, BlockIds } from './blocks';
import { StaticBlock } from '../gameplay/statics/baseStatic';

export class BlockPlacer {
  private levelScene: Level;

  public init(levelScene: Level) {
    this.levelScene = levelScene;
  }

  public addBlock(pos: Phaser.Math.Vector2, block: string | BlockInfo): StaticBlock {
    const { blockName, blockData } = this.resolveBlockInfo(block);

    console.log(BlockIds.indexOf(blockName));

    const gameObject = this.createStaticSprite(pos, blockData.texture, blockData.type === BlockType.Foreground);
    gameObject.setDepth(blockData.type === BlockType.Foreground ? 0 : -10);
    const wallBlock = new StaticBlock(gameObject, blockName);

    return wallBlock;
  }

  public addTiledBlock(pos: Phaser.Math.Vector2, size: Phaser.Math.Vector2, block: string | BlockInfo): StaticBlock {
    const { blockName, blockData } = this.resolveBlockInfo(block);

    const gameObject = this.createStaticTiledSprite(pos, size, blockData.texture, blockData.type === BlockType.Foreground);
    gameObject.setDepth(blockData.type === BlockType.Foreground ? 0 : -10);
    const wallBlock = new StaticBlock(gameObject, blockName);

    return wallBlock;
  }

  private resolveBlockInfo(block: string | BlockInfo): { blockName: string, blockData: BlockInfo } {
    let blockName: string = null;
    let blockData: BlockInfo;

    if (typeof block === 'string') {
      blockName = block;
      blockData = Blocks.get(blockName);
    } else {
      blockName = 'custom';
      blockData = block;
    }

    return { blockName, blockData };
  }

  private createStaticSprite(
    position: Phaser.Math.Vector2,
    texture: string,
    collision: boolean = true): Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.StaticBody } {
      let gameObject: Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.StaticBody };

      gameObject = this.levelScene.add.sprite(
        position.x * Constants.Level.GRID_SIZE_X,
        position.y * Constants.Level.GRID_SIZE_Y,
        texture) as any;

      if (collision) {
        this.setupStaticPhysics(gameObject);
      }

      return gameObject;
  }

  private createStaticTiledSprite(
    position: Phaser.Math.Vector2,
    size: Phaser.Math.Vector2,
    texture: string,
    collision: boolean = true): Phaser.GameObjects.TileSprite & { body: Phaser.Physics.Arcade.StaticBody } {
      let gameObject: Phaser.GameObjects.TileSprite & { body: Phaser.Physics.Arcade.StaticBody };

      gameObject = this.levelScene.add.tileSprite(
        position.x * Constants.Level.GRID_SIZE_X,
        position.y * Constants.Level.GRID_SIZE_Y,
        size.x * Constants.Level.GRID_SIZE_X,
        size.y * Constants.Level.GRID_SIZE_Y,
        texture) as any;

      if (collision) {
        this.setupStaticPhysics(gameObject);
      }

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
