import { Scene, GameObjects } from 'phaser';
import { InputService } from '../services/input.service';
import { Entity } from '../gameplay/entities/baseEntity';
import { EntitySpawnerService } from '../services/entity-spawner.service';
import { BlockPlacer } from '../core/blockPlacer';
import { CharacterEntity } from '../gameplay/entities/characterEntity';
import { AssetService } from '../services/asset.service';
import { MapGrid } from '../core/mapGrid';

export class Level extends Scene {
  public mapGrid: MapGrid;
  public entities: Entity[] = [];
  public player: CharacterEntity;

  protected entitySpawner: EntitySpawnerService;
  protected blockPlacer: BlockPlacer;

  protected backgroundImage: GameObjects.TileSprite;

  constructor(protected inputService: InputService) {
    super({ key: 'level' });
  }

  create() {
    this.entitySpawner = new EntitySpawnerService();
    this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);

    this.blockPlacer = new BlockPlacer();
    this.blockPlacer.init(this);

    this.mapGrid = new MapGrid(this.blockPlacer);

    // this.blockPlacer.addTiledBlock(new Phaser.Math.Vector2(3, 3), new Phaser.Math.Vector2(3, 4), 'stone_floor');
    this.mapGrid.fillArea(new Phaser.Math.Vector2(3, 3), new Phaser.Math.Vector2(3, 4), 'stone_floor');
    this.mapGrid.addBlock(new Phaser.Math.Vector2(2, 2), 'stone_bricks');

    this.player = this.entitySpawner.spawnPlayer('maxi', new Phaser.Math.Vector2(11, 9), 30);
    this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);

    this.entitySpawner.spawnStalker(new Phaser.Math.Vector2(30, 20), 25);

    this.backgroundImage = this.add.tileSprite(0, 0, 900, 708, 'grass01');
    this.backgroundImage.setDepth(-50);
  }

  preload() {
    AssetService.loadBlockSprites(this.load);
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
