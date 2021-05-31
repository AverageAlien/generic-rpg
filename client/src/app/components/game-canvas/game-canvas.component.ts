import { Component, OnInit, NgZone } from '@angular/core';
import Phaser from 'phaser';

import { InputService } from 'src/app/gameServices/input.service';
import { ClientLevel } from 'src/app/scenes/clientLevel';
import { LevelLoaderService } from 'src/app/gameServices/level-loader.service';
import { Constants } from 'src/app/core/constants';
import { NetworkingService } from 'src/app/services/networking.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiOverlayService } from 'src/app/services/ui-overlay.service';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss']
})
export class GameCanvasComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  level: ClientLevel;

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

  get isAlive() {
    return this.uiOverlay.isAlive;
  }

  ngOnInit() {
    this.networkingService.chosenUsername = this.authService.currentUsername;

    this.ngZone.runOutsideAngular(() => {
      this.phaserGame = new Phaser.Game(this.config);
    });
  }

  onRespawn() {
    this.networkingService.sendRespawn();
  }

  onExportLevel() {
    console.log(LevelLoaderService.exportLevel(this.level));
  }

  onImportLevel() {
    const levelJson = prompt('Paste level JSON');

    if (!levelJson) { return; }

    LevelLoaderService.importlevel(levelJson, this.level);
  }
}
