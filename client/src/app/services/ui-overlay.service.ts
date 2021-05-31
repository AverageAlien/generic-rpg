import { Injectable } from '@angular/core';
import { ClientLevel } from '../scenes/clientLevel';
import { NetworkingService } from './networking.service';

@Injectable({
  providedIn: 'root'
})
export class UiOverlayService {
  private clientLevel: ClientLevel;
  private networkingService: NetworkingService;

  constructor() { }

  get isAlive() {
    return (!this.clientLevel) || this.clientLevel.entities.indexOf(this.clientLevel.player) >= 0;
  }

  init(lvl: ClientLevel, networking: NetworkingService) {
    this.clientLevel = lvl;
    this.networkingService = networking;
  }

  respawnPlayer() {
    this.networkingService.sendRespawn();
  }
}
