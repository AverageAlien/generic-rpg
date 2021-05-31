import { Component, OnInit, NgZone } from '@angular/core';
import { ClientLevel } from 'src/app/scenes/clientLevel';
import { InputService } from 'src/app/gameServices/input.service';
import { LevelLoaderService } from 'src/app/gameServices/level-loader.service';
import { Constants } from 'src/app/core/constants';
import { LevelEditor } from 'src/app/scenes/levelEditor';
import { NetworkingService } from 'src/app/services/networking.service';

@Component({
  selector: 'app-level-editor',
  templateUrl: './level-editor.component.html',
  styleUrls: ['./level-editor.component.scss']
})
export class LevelEditorComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  level: ClientLevel;

  constructor(
    private ngZone: NgZone
  ) {
    this.level = new LevelEditor(new InputService(), new NetworkingService(null, null), null);

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
    console.log(LevelLoaderService.exportLevel(this.level));
  }

  onImportLevel() {
    const levelJson = prompt('Paste level JSON');

    if (!levelJson) { return; }

    LevelLoaderService.importlevel(levelJson, this.level);
  }
}
