import { Injectable, NgZone } from '@angular/core';
import { RendererOptions } from '../models/rendererOptions.model';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { GameObject } from '../core/gameplayObjects';
import { Vector } from '../core/geometryObjects';
import { BoxCollider } from '../core/physicsObjects';
import { Rectangle } from '../core/drawableObjects';

@Injectable({
  providedIn: 'root',
})
export class RendererService {
  private defaultBg = '#000000';
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;

  public gameplayObjects: GameObject[];

  constructor(private ngZone: NgZone) {}

  public init(ctx: CanvasRenderingContext2D, options: RendererOptions) {
    this.defaultBg = options.defaultBg;
    this.width = options.width;
    this.height = options.height;

    this.ctx = ctx;

    ctx.fillStyle = this.defaultBg;
    ctx.fillRect(0, 0, this.width, this.height);

    this.gameplayObjects = [];

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

  public CreateStaticBlock(
    position: Vector,
    size: Vector = new Vector(10, 10),
    color: string = 'gray',
    outlineColor: string = null,
    outlineSize: number = 0
  ) {
    const gameObject = new GameObject(position);
    gameObject.collider = new BoxCollider(true, true, gameObject, size);
    gameObject.texture = new Rectangle(gameObject, color, size, outlineColor, outlineSize);

    this.gameplayObjects.push(gameObject);
  }

  private draw() {
    const id = requestAnimationFrame(() => {
      this.draw();
    });
    // draw stuff

    this.gameplayObjects
      .filter((obj) => obj.texture)
      .forEach((obj) => {
        obj.texture.draw(this.ctx);
      });
  }
}
