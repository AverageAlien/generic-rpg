import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RendererService } from 'src/app/services/renderer.service';
import { Vector } from 'src/app/core/geometryObjects';
import { InputService } from 'src/app/services/input.service';
import { PlayerController } from 'src/app/core/controllerObjects';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss']
})
export class GameCanvasComponent implements OnInit {
  @ViewChild('gameCanvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  keybinds = {
    up: 'KeyS', // X axis is inverted!
    down: 'KeyW',
    left: 'KeyA',
    right: 'KeyD'
  };

  constructor(private renderService: RendererService, private inputService: InputService) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.renderService.init(this.ctx, {
      defaultBg: '#000000',
      width: this.canvas.nativeElement.width,
      height: this.canvas.nativeElement.height
    });
  }

  public onKeyDown(event: KeyboardEvent) {
    if (event.repeat) { return; }
    switch (event.code) {
      case this.keybinds.up:
        this.inputService.moveUp(true);
        break;
      case this.keybinds.down:
        this.inputService.moveDown(true);
        break;
      case this.keybinds.left:
        this.inputService.moveLeft(true);
        break;
      case this.keybinds.right:
        this.inputService.moveRight(true);
        break;
    }
  }

  public onKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case this.keybinds.up:
        this.inputService.moveUp(false);
        break;
      case this.keybinds.down:
        this.inputService.moveDown(false);
        break;
      case this.keybinds.left:
        this.inputService.moveLeft(false);
        break;
      case this.keybinds.right:
        this.inputService.moveRight(false);
        break;
    }
  }
}
