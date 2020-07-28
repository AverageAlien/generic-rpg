import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { InputService } from 'src/app/services/input.service';
import { Level } from 'src/app/scenes/levelScene';
import { EntitySpawnerService } from 'src/app/services/entity-spawner.service';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss']
})
export class GameCanvasComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor(private inputService: InputService) {
    this.config = {
      type: Phaser.AUTO,
      height: 608,
      width: 800,
      scene: [ new Level(inputService) ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade'
      },
    };

  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
