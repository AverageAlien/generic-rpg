import { Scene, GameObjects, Tilemaps } from 'phaser';
import { InputService } from '../services/input.service';
import { Entity } from '../gameplay/entities/baseEntity';
import { EntitySpawnerService } from '../services/entity-spawner.service';
import { CharacterEntity } from '../gameplay/entities/characterEntity';
import { AssetService } from '../services/asset.service';
import { MapGrid } from '../core/mapGrid';
import { LevelLoaderService } from '../services/level-loader.service';
import { UI } from '../ui/ui';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { Armor } from '../gameplay/items/armor';

export class Level extends Scene {
  public mapGrid: MapGrid;
  public entities: Entity[] = [];
  public levelUI: GameObjects.DOMElement[] = [];
  public player: HumanoidEntity;

  public debugGraphics: GameObjects.Graphics;

  protected entitySpawner: EntitySpawnerService;

  protected backgroundImage: GameObjects.TileSprite;

  constructor(protected inputService: InputService, protected levelLoader: LevelLoaderService) {
    super({ key: 'level' });
  }

  create() {
    this.entitySpawner = new EntitySpawnerService();
    this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);

    this.mapGrid = new MapGrid(this, 'tileset');

    this.player = this.entitySpawner.spawnPlayer('maxi', new Phaser.Math.Vector2(-17, -7), 30);
    this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);

    const stalker = this.entitySpawner.spawnStalker(new Phaser.Math.Vector2(6, 11), 20);

    timer(10000)
      .subscribe(() => {
        stalker.equipArmor(new Armor({
          name: 'Leather vest',
          texture: 'leather_vest'
        }));
      });

    this.player.equipArmor(new Armor({
      name: 'Leather vest',
      texture: 'leather_vest'
    }));

    // stalker.damage(20);

    // interval(100)
    //   .pipe(takeUntil(this.player.destroyed))
    //   .subscribe(() => { this.player.damage(1); });

    this.backgroundImage = this.add.tileSprite(
      0, 0,
      this.sys.game.canvas.width + 100,
      this.sys.game.canvas.height + 100,
      'grass01'
    );

    this.backgroundImage.setDepth(-50);

    this.debugGraphics = this.add.graphics().setDepth(2).setAlpha(0.75);

    this.events.on('postupdate', this.postupdate.bind(this));

    this.levelUI.push(new UI.HealthBarPlayer(this));

    const renderSprite = this.add.renderTexture(-500, -200).setDepth(5);
    renderSprite.draw('humanoid', 0, 0);

    timer(5000)
      .subscribe(() => { renderSprite.draw('leather_vest'); });
    timer(10000)
      .subscribe(() => { renderSprite.clear();
      renderSprite.draw('humanoid'); });
  }

  preload() {
    AssetService.loadBlockSprites(this.load);

    AssetService.loadEntitySprites(this.load);

    AssetService.loadArmorSprites(this.load);
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

  postupdate() {
    this.levelUI.forEach(ui => ui.update());
  }
}
