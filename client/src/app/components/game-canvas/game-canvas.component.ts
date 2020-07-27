import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { MainScene } from 'src/app/core/mainScene.ts';
import { InputService } from 'src/app/services/input.service';

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
      height: 600,
      width: 800,
      scene: [ new MainScene(inputService) ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 500
          }
        }
      },
    };

  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
