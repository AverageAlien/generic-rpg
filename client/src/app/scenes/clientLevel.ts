import { Scene, GameObjects } from 'phaser';
import { InputService } from '../gameServices/input.service';
import { Entity } from '../gameplay/entities/baseEntity';
import { EntitySpawnerService } from '../gameServices/entity-spawner.service';
import { AssetService } from '../gameServices/asset.service';
import { MapGrid } from '../core/mapGrid';
import { UI } from '../ui/ui';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { LevelScene } from '../core/levelScene';
import { NetworkingService } from '../services/networking.service';
import { ClientEntitySpawnerService } from '../gameServices/client-entity-spawner.service';

export class ClientLevel extends Scene implements LevelScene {
  public mapGrid: MapGrid;
  public levelName = 'Default level';
  public entities: Entity[] = [];
  public levelUI: GameObjects.DOMElement[] = [];
  public player: HumanoidEntity;

  public debugGraphics: GameObjects.Graphics;

  protected entitySpawner: ClientEntitySpawnerService;

  protected backgroundImage: GameObjects.TileSprite;

  constructor(protected inputService: InputService, protected networkingService: NetworkingService) {
    super({ key: 'level' });
  }

  create() {
    this.entitySpawner = new ClientEntitySpawnerService(
      this.inputService.getInputKeys(this.input.keyboard),
      this,
      this.networkingService
    );

    this.mapGrid = new MapGrid(this, 'tileset');

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

    this.networkingService.loadLevel(this);
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
