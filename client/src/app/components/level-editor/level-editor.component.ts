import { Component, OnInit, NgZone } from '@angular/core';
import { ClientLevel } from 'src/app/scenes/clientLevel';
import { InputService } from 'src/app/gameServices/input.service';
import { LevelLoaderService } from 'src/app/gameServices/level-loader.service';
import { Constants } from 'src/app/core/constants';
import { LevelEditor } from 'src/app/scenes/levelEditor';
import { NetworkingService } from 'src/app/services/networking.service';
import { BlockErase, BlockIds, Blocks } from 'src/app/core/blocks';
import { EditorOverlayService } from 'src/app/services/editor-overlay.service';
import { BlockItem } from 'src/app/models/blockItem.model';

@Component({
  selector: 'app-level-editor',
  templateUrl: './level-editor.component.html',
  styleUrls: ['./level-editor.component.scss']
})
export class LevelEditorComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  level: ClientLevel;
  availableBlocks: BlockItem[] = [{
    id: BlockErase
  } as BlockItem, ...BlockIds.map(id => {
    const blockInfo = Blocks.get(id);

    return {
     id,
     texture: blockInfo.texture,
     layer: blockInfo.type
    } as BlockItem;
  }).sort((a, b) => b.layer - a.layer)];

  leftSelection: BlockItem = null;
  rightSelection: BlockItem = null;

  constructor(
    private ngZone: NgZone,
    private editorOverlay: EditorOverlayService
  ) {
    this.level = new LevelEditor(new InputService(), new NetworkingService(null, null), null, editorOverlay);

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

    this.onSelectLeftBlock(this.availableBlocks[1]);
    this.onSelectRightBlock(this.availableBlocks[0]);
  }

  getBlockTexturePath(block: BlockItem): string {
    if (block.id === BlockErase) {
      return 'assets/misc/empty_block_icon.png';
    }

    return `assets/blocks/${block.texture}.png`;
  }

  onSelectLeftBlock(block: BlockItem) {
    this.leftSelection = block;
    this.editorOverlay.selectedLeftMouseBlock = block.id;

    if (this.rightSelection === this.leftSelection) {
      this.rightSelection = null;
      this.editorOverlay.selectedRightMouseBlock = null;
    }
  }

  onSelectRightBlock(block: BlockItem) {
    this.rightSelection = block;
    this.editorOverlay.selectedRightMouseBlock = block.id;

    if (this.leftSelection === this.rightSelection) {
      this.leftSelection = null;
      this.editorOverlay.selectedLeftMouseBlock = null;
    }

    return false; // prevent context menu
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
