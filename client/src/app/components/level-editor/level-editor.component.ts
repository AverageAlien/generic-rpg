import { Component, OnInit, NgZone } from '@angular/core';
import { Level } from 'src/app/scenes/levelScene';
import { InputService } from 'src/app/services/input.service';
import { LevelLoaderService } from 'src/app/services/level-loader.service';
import { Constants } from 'src/app/core/constants';
import { LevelEditor } from 'src/app/scenes/levelEditor';

@Component({
  selector: 'app-level-editor',
  templateUrl: './level-editor.component.html',
  styleUrls: ['./level-editor.component.scss']
})
export class LevelEditorComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  level: Level;

  constructor(
    private inputService: InputService,
    private levelLoader: LevelLoaderService,
    private ngZone: NgZone
  ) {
    this.level = new LevelEditor(inputService, levelLoader);

    this.config = {
      type: Phaser.AUTO,
      height: Constants.Screen.SCREEN_H,
      width: Constants.Screen.SCREEN_W,
      scene: [ this.level ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade'
      },
      disableContextMenu: true
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
