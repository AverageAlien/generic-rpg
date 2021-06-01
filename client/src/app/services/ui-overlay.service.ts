import { Injectable } from '@angular/core';
import { Armor } from '../gameplay/items/armor';
import { Item } from '../gameplay/items/baseItem';
import { ItemType } from '../gameplay/items/itemEnums';
import { Weapon } from '../gameplay/items/weapon';
import { InventoryItem } from '../models/inventoryItem.model';
import { ClientLevel } from '../scenes/clientLevel';
import { NetworkingService } from './networking.service';

@Injectable({
  providedIn: 'root'
})
export class UiOverlayService {
  public inventoryOpen = false;

  private clientLevel: ClientLevel;
  private networkingService: NetworkingService;

  constructor() { }

  get isAlive() {
    return (!!this.clientLevel) && this.clientLevel.entities.indexOf(this.clientLevel.player) >= 0;
  }

  init(lvl: ClientLevel, networking: NetworkingService) {
    this.clientLevel = lvl;
    this.networkingService = networking;
  }

  respawnPlayer() {
    this.networkingService.sendRespawn();
  }

  loadPlayerItems(): Item[] {
    return this.clientLevel.inventory;

    // return this.clientLevel.inventory.map(i => {
    //   const base = {
    //     type: i.itemType,
    //     name: i.name,
    //     description: i.description,
    //     icon: i.texture,
    //     mass: i.mass,
    //     price: i.price
    //   } as InventoryItem;

    //   if (i.itemType === ItemType.Weapon) {
    //     base.damage = (i as Weapon).damage;
    //     base.level = (i as Weapon).level;
    //   }

    //   if (i.itemType === ItemType.Armor) {
    //     base.armor = (i as Armor).armor;
    //     base.level = (i as Armor).level;
    //   }

    //   return base;
    // });
  }
}
