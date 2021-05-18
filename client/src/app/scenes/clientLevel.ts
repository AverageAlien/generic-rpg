import { Scene, GameObjects } from 'phaser';
import { InputService } from '../gameServices/input.service';
import { Entity } from '../gameplay/entities/baseEntity';
import { AssetService } from '../gameServices/asset.service';
import { MapGrid } from '../core/mapGrid';
import { UI } from '../ui/ui';
import { HumanoidEntity } from '../gameplay/entities/humanoidEntity';
import { LevelScene } from '../core/levelScene';
import { NetworkingService } from '../services/networking.service';
import { ClientEntitySpawnerService } from '../gameServices/client-entity-spawner.service';
import { fromEvent } from 'rxjs';
import { CharacterEntity } from '../gameplay/entities/characterEntity';
import { EntityRendererService } from '../gameServices/entity-renderer.service';
import { Armor } from '../gameplay/items/armor';
import { ArmorType, DamageType } from '../gameplay/items/itemEnums';
import { Weapon } from '../gameplay/items/weapon';
import { EffectsSystem } from '../gameplay/effects/effectsSystem';
import { DamageNumberEffect } from '../gameplay/effects/damageNumber';
import { WeaponService } from '../gameServices/weapon.service';

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

    EntityRendererService.init(this);

    WeaponService.init(this, this.networkingService);

    EffectsSystem.InitializeEffects(this);

    this.backgroundImage = this.add.tileSprite(
      0, 0,
      this.sys.game.canvas.width + 100,
      this.sys.game.canvas.height + 100,
      'grass01'
    );

    this.backgroundImage.setDepth(-50);

    this.debugGraphics = this.add.graphics().setDepth(2).setAlpha(0.75);

    fromEvent(this.events, 'preupdate').subscribe(this.preupdate.bind(this));
    fromEvent(this.events, 'postupdate').subscribe(this.postupdate.bind(this));
    window.addEventListener('resize', () => this.game.scale.updateBounds());

    this.levelUI.push(new UI.HealthBarPlayer(this));

    this.networkingService.playerLeft.subscribe(packet => {
      (this.entities.find(e => e.networkId === packet.networkId) as CharacterEntity).destroy();
    });

    this.networkingService.loadLevel(this);

    setTimeout(() => {
      this.testArmor();
    }, 3000);
    setInterval(() => {
      [5, 10, 25, 100, 500, 1000, 2500, 6666, 10000, Infinity].forEach((v, i) => {
        new DamageNumberEffect(v, 1024, i * 32);
      });
    }, 7000);
  }

  testArmor() {
    this.networkingService.sendEquipArmor(new Armor({
      description: 'aaa armor desc',
      level: 5,
      mass: 15,
      name: 'steel armor',
      price: 600,
      texture: 'steel_vest',
      armorType: ArmorType.Chestplate,
      armor: 8
    }));

    this.networkingService.sendEquipArmor(new Armor({
      name: 'steel bowl',
      description: 'steel helmet to protect ur dum head',
      level: 2,
      mass: 5,
      price: 200,
      texture: 'steel_bowl',
      armorType: ArmorType.Helmet,
      armor: 5
    }));

    this.networkingService.sendEquipArmor(new Armor({
      name: 'leather boots',
      description: 'ooaaoaa',
      level: 2,
      mass: 5,
      price: 200,
      texture: 'leather_boots',
      armorType: ArmorType.Boots,
      armor: 5
    }));

    this.networkingService.sendEquipWeapon(new Weapon({
      name: 'short sword',
      description: 'ooaaoaa',
      level: 2,
      mass: 5,
      price: 200,
      texture: 'short_sword',
      damage: [
        { type: DamageType.Cut, value: 80 },
        { type: DamageType.Blunt, value: 60 },
      ],
      swing: 60,
      refire: 500,
      reach: 48
    }));
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

  preupdate() {
    this.networkingService.synchronizeWithServer(this);
  }

  postupdate() {
    this.levelUI.forEach(ui => ui.update());
  }
}
