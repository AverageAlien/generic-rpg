import { Injectable, NgZone } from '@angular/core';
import { RendererOptions } from '../models/rendererOptions.model';
import { DrawableObject, Rectangle, Circle } from '../models/rendererObjects/drawableObject';
import { Vector } from '../models/rendererObjects/geometryObjects';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RendererService {
  private defaultBg = '#000000';
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;

  public renderedObjects: DrawableObject[];

  constructor(private ngZone: NgZone) {}

  public init(ctx: CanvasRenderingContext2D, options: RendererOptions) {
    this.defaultBg = options.defaultBg;
    this.width = options.width;
    this.height = options.height;

    this.ctx = ctx;

    ctx.fillStyle = this.defaultBg;
    ctx.fillRect(0, 0, this.width, this.height);

    this.renderedObjects = [];

    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.draw();
      } else {
        fromEvent(window, 'DOMContentLoaded')
          .pipe(take(1))
          .subscribe(() => this.draw());
      }
    });
  }

  private draw() {
    const id = requestAnimationFrame(() => {
      this.draw();
    });
    // draw stuff

    this.renderedObjects.forEach(obj => {
      obj.draw(this.ctx);
    });
  }
}
