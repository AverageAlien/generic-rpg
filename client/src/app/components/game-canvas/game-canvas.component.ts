import { Component, OnInit, NgZone } from '@angular/core';
import Phaser from 'phaser';
import { Socket } from 'ngx-socket-io';

import { InputService } from 'src/app/services/input.service';
import { Level } from 'src/app/scenes/levelScene';
import { LevelLoaderService } from 'src/app/services/level-loader.service';
import { Constants } from 'src/app/core/constants';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss']
})
export class GameCanvasComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  level: Level;

  constructor(
    private inputService: InputService,
    private levelLoader: LevelLoaderService,
    private ngZone: NgZone
  ) {
    this.level = new Level(inputService, levelLoader);

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

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.phaserGame = new Phaser.Game(this.config);
    });
  }

  onExportLevel() {
    console.log(this.levelLoader.exportLevel(this.level));
  }

  onImportLevel() {
    const levelJson = prompt('Paste level JSON');

    if (!levelJson) { return; }

    this.levelLoader.importlevel(levelJson, this.level);
  }
}
