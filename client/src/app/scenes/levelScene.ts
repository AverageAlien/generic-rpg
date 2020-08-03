import { Scene, GameObjects, Tilemaps } from 'phaser';
import { InputService } from '../services/input.service';
import { Entity } from '../gameplay/entities/baseEntity';
import { EntitySpawnerService } from '../services/entity-spawner.service';
import { BlockPlacer } from '../core/blockPlacer';
import { CharacterEntity } from '../gameplay/entities/characterEntity';
import { AssetService } from '../services/asset.service';
import { MapGrid } from '../core/mapGrid';
import { LevelLoaderService } from '../services/level-loader.service';
import PF, { DiagonalMovement } from 'pathfinding';

export class Level extends Scene {
  public mapGrid: MapGrid;
  public entities: Entity[] = [];
  public player: CharacterEntity;

  public debugText: GameObjects.Text;
  public debugGraphics: GameObjects.Graphics;

  protected entitySpawner: EntitySpawnerService;
  protected blockPlacer: BlockPlacer;

  protected backgroundImage: GameObjects.TileSprite;

  constructor(protected inputService: InputService, protected levelLoader: LevelLoaderService) {
    super({ key: 'level' });
  }

  create() {
    this.entitySpawner = new EntitySpawnerService();
    this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);

    this.blockPlacer = new BlockPlacer();
    this.blockPlacer.init(this);

    this.mapGrid = new MapGrid(this, 'tileset');

    this.player = this.entitySpawner.spawnPlayer('maxi', new Phaser.Math.Vector2(-17, -7), 30);
    this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);

    this.entitySpawner.spawnStalker(new Phaser.Math.Vector2(5, 11), 25);

    this.backgroundImage = this.add.tileSprite(
      0, 0,
      this.sys.game.canvas.width + 100,
      this.sys.game.canvas.height + 100,
      'grass01'
    );

    this.backgroundImage.setDepth(-50);

    this.debugText = this.add.text(10, 10, 'Coords:').setScrollFactor(0).setDepth(100);
    this.debugGraphics = this.add.graphics().setDepth(2).setAlpha(0.75);

    // pathfind testing
    // const matrix = [
    //   [0, 1, 0, 0, 0],
    //   [0, 0, 1, 0, 0],
    //   [1, 0, 0, 0, 0],
    // ];
    // const grid = new PF.Grid(matrix);

    // const finder = new PF.AStarFinder({
    //   diagonalMovement: DiagonalMovement.IfAtMostOneObstacle,
    //   weight: 1,
    //   heuristic: PF.Heuristic.euclidean
    // });

    // const path = finder.findPath(0, 0, 2, 0, grid);
    // console.log(PF.Util.compressPath(path));
  }

  preload() {
    AssetService.loadBlockSprites(this.load);

    AssetService.loadEntitySprites(this.load);
  }

  update() {
    this.entities.forEach(e => e.update());

    this.debugText.setText(`Coords: ${Math.round(this.player.gameObject.body.x)}; ${Math.round(this.player.gameObject.body.y)}`);

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
