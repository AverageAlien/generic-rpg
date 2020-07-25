import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RendererService } from '../services/renderer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('gameCanvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(private renderService: RendererService) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.renderService.init(this.ctx, {
      defaultBg: '#000000',
      width: this.canvas.nativeElement.width,
      height: this.canvas.nativeElement.height
    });
  }
}
