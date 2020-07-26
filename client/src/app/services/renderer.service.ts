import { Injectable, NgZone } from '@angular/core';
import { RendererOptions } from '../models/rendererOptions.model';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { GameObject } from '../core/gameplayObjects';
import { EntitySpawnerService } from './entity-spawner.service';
import { PhysicsService } from './physics.service';
import { InputService } from './input.service';
import { Vector } from '../core/geometryObjects';

@Injectable({
  providedIn: 'root',
})
export class RendererService {
  private defaultBg = '#000000';
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;

  private physicsInterval;
  private physicsRate = 20;

  public gameplayObjects: GameObject[];

  constructor(
    private ngZone: NgZone,
    private entitySpawner: EntitySpawnerService,
    private physicsService: PhysicsService,
    private inputService: InputService
  ) {}

  public init(ctx: CanvasRenderingContext2D, options: RendererOptions) {
    this.defaultBg = options.defaultBg;
    this.width = options.width;
    this.height = options.height;

    this.ctx = ctx;

    this.cleanCanvas();

    this.gameplayObjects = [];

    this.inputService.init();

    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.runGame();
      } else {
        fromEvent(window, 'DOMContentLoaded')
          .pipe(take(1))
          .subscribe(() => this.runGame());
      }
    });
  }

  private runGame() {
    this.physicsInterval = setInterval(() => {
      this.physicsService.update(this.gameplayObjects);
    }, this.physicsRate);

    this.draw();

    this.gameplayObjects.push(this.entitySpawner.CreatePlayer('DefaultPlayer', this.inputService.controller));

    this.gameplayObjects.push(this.entitySpawner.CreateStaticBlock(Vector.Random(0, 720, 0, 512), Vector.RandomSquare(10, 150), 'gray'));
    this.gameplayObjects.push(this.entitySpawner.CreateStaticBlock(Vector.Random(0, 720, 0, 512), Vector.RandomSquare(10, 150), 'gray'));
    this.gameplayObjects.push(this.entitySpawner.CreateStaticBlock(Vector.Random(0, 720, 0, 512), Vector.RandomSquare(10, 150), 'gray'));
  }

  private cleanCanvas() {
    this.ctx.fillStyle = this.defaultBg;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  private draw() {
    const id = requestAnimationFrame(() => {
      this.draw();
    });
    // draw stuff
    this.cleanCanvas();

    this.gameplayObjects
      .filter((obj) => obj.texture)
      .forEach((obj) => {
        obj.texture.draw(this.ctx);
      });
  }
}
