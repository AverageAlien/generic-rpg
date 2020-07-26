import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RendererService } from 'src/app/services/renderer.service';
import { Vector } from 'src/app/core/geometryObjects';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss']
})
export class GameCanvasComponent implements OnInit {
  @ViewChild('gameCanvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  keybinds = {
    up: 'w',
    down: 's',
    left: 'a',
    right: 'd'
  };

  constructor(private renderService: RendererService) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.renderService.init(this.ctx, {
      defaultBg: '#000000',
      width: this.canvas.nativeElement.width,
      height: this.canvas.nativeElement.height
    });

    setInterval(() => {
      const size = Math.random() * 25 + 5;
      this.renderService.CreateStaticBlock(Vector.Random(0, 720, 0, 512), new Vector(size, size), 'blue', 'white', 2);
    }, 1000);
  }

  public onKeyDown(event: KeyboardEvent) {
    console.log(event);
    console.log(typeof event);
  }

  public onKeyUp(event: KeyboardEvent) {
    console.log(event);
    console.log(typeof event);
  }
}
