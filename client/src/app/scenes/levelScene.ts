import { Scene, GameObjects } from 'phaser';
import { InputService } from '../services/input.service';
import { Entity } from '../gameplay/entities/baseEntity';
import { EntitySpawnerService } from '../services/entity-spawner.service';
import { LevelBuilderService } from '../services/level-builder.service';
import { StaticBlock } from '../gameplay/statics/baseStatic';
import { CharacterEntity } from '../gameplay/entities/characterEntity';

export class Level extends Scene {
  public statics: StaticBlock[] = [];
  public entities: Entity[] = [];
  public player: CharacterEntity;

  private entitySpawner: EntitySpawnerService;
  private levelBuilder: LevelBuilderService;

  private backgroundImage: GameObjects.TileSprite;

  constructor(private inputService: InputService) {
    super({ key: 'level' });
  }

  create() {
    this.entitySpawner = new EntitySpawnerService();
    this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);

    this.levelBuilder = new LevelBuilderService();
    this.levelBuilder.init(this);

    this.levelBuilder.addBrickWall(new Phaser.Math.Vector2(0, 7));

    this.player = this.entitySpawner.spawnPlayer('maxi', new Phaser.Math.Vector2(11, 9), 30);
    this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);

    this.levelBuilder.addBrickWallRepeated(new Phaser.Math.Vector2(5, 16), new Phaser.Math.Vector2(1, 2));
    this.levelBuilder.addBrickWallRepeated(new Phaser.Math.Vector2(17, 5), new Phaser.Math.Vector2(2, 1));

    this.backgroundImage = this.add.tileSprite(0, 0, 900, 708, 'grass01');
    this.backgroundImage.setDepth(-50);
  }

  preload() {
    this.load.image('grass01', 'assets/textures/grass01.png');
    this.load.image('wall01', 'assets/textures/stone_wall01.png');
  }

  update() {
    this.entities.forEach(e => e.update());

    this.backgroundImage.setPosition(
      this.cameras.main.worldView.centerX,
      this.cameras.main.worldView.centerY
    );
    this.backgroundImage.setTilePosition(
      this.cameras.main.worldView.centerX,
      this.cameras.main.worldView.centerY
    );
  }
}
