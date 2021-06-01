import { Component, OnInit, NgZone } from '@angular/core';
import Phaser from 'phaser';

import { InputService } from 'src/app/gameServices/input.service';
import { ClientLevel } from 'src/app/scenes/clientLevel';
import { LevelLoaderService } from 'src/app/gameServices/level-loader.service';
import { Constants } from 'src/app/core/constants';
import { NetworkingService } from 'src/app/services/networking.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiOverlayService } from 'src/app/services/ui-overlay.service';
import { InventoryItem } from 'src/app/models/inventoryItem.model';
import { ItemType } from 'src/app/gameplay/items/itemEnums';
import { Item } from 'src/app/gameplay/items/baseItem';
import { Weapon } from 'src/app/gameplay/items/weapon';
import { Armor } from 'src/app/gameplay/items/armor';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss']
})
export class GameCanvasComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  level: ClientLevel;

  inventoryItems: Item[] = [];
  selectedItem: any;

  constructor(
    private ngZone: NgZone,
    private networkingService: NetworkingService,
    private authService: AuthService,
    private uiOverlay: UiOverlayService
  ) {
    this.level = new ClientLevel(new InputService(), networkingService, uiOverlay);

    this.config = {
      type: Phaser.AUTO,
      height: Constants.Screen.SCREEN_H,
      width: Constants.Screen.SCREEN_W,
      scene: [ this.level ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade'
      },
      dom: {
        createContainer: true
      }
    };
  }

  get showInventory() {
    return this.uiOverlay.inventoryOpen;
  }

  get isAlive() {
    return this.uiOverlay.isAlive;
  }

  ngOnInit() {
    this.networkingService.chosenUsername = this.authService.currentUsername;

    this.ngZone.runOutsideAngular(() => {
      this.phaserGame = new Phaser.Game(this.config);
    });
  }

  getTexturePath(item: Item) {
    if (item.itemType === ItemType.Weapon) {
      return `assets/items/weapons/${item.texture}_icon.png`;
    } else {
      return `assets/items/armor/${item.texture}_icon.png`;
    }
  }

  getDamageString(item: Item) {
    return ((item as Weapon).damage || []).map(d => `${d.value} ${d.type.toLocaleLowerCase()}`).join(', ');
  }

  onSelectItem(item: Item) {
    this.selectedItem = item;
  }

  onRespawn() {
    this.networkingService.sendRespawn();
  }

  onEquipItem() {
    const item = this.inventoryItems.find(i => i === this.selectedItem);
    if (!item) { return; }

    if (item.itemType === ItemType.Weapon) {
      this.networkingService.sendEquipWeapon(item as Weapon);
    } else if (item.itemType === ItemType.Armor) {
      this.networkingService.sendEquipArmor(item as Armor);
    }
  }

  onOpenInventory() {
    this.inventoryItems = this.uiOverlay.loadPlayerItems();
    this.selectedItem = this.inventoryItems[0];
    this.uiOverlay.inventoryOpen = true;
  }

  onCloseInventory() {
    this.uiOverlay.inventoryOpen = false;
  }
}
