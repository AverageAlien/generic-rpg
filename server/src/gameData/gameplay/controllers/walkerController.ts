import { Controller } from './baseController';
import { Level } from 'src/app/scenes/levelScene';
import { CharacterEntity } from '../entities/characterEntity';
import { FactionsAreFriendly } from 'src/app/core/factions';
import { Entity } from '../entities/baseEntity';
import PF, { DiagonalMovement } from 'pathfinding';
import { Constants } from 'src/app/core/constants';
import { GameObjects } from 'phaser';

export class WalkerController implements Controller {
  private target: Entity = null;

  private readonly searchFrequency = 250; // ms
  private readonly searchIncrement = 16.67;
  private timeSinceLastSearch = 0;

  private pathWaypoints: Phaser.Math.Vector2[] = null;
  private rushAtTarget = false;
  private readonly unrushDistanceSq = Math.pow(Math.min(Constants.Level.GRID_SIZE_Y, Constants.Level.GRID_SIZE_X) * 2, 2);

  private readonly waypointReachedDistanceSq = Math.pow(
    Math.min(Constants.Level.GRID_SIZE_X, Constants.Level.GRID_SIZE_Y) * 0.7,
  2);

  private _DEBUG = false;

  constructor(
    private myself: CharacterEntity,
    private levelScene: Level,
    public aggroRadius: number = 256,
    public unaggroRadius: number = aggroRadius * Math.SQRT2,
    public minRange: number = 64
  ) {}

  get movement(): Phaser.Math.Vector2 {

    if (!this.target || !this.target.gameObject || !this.target.gameObject.body) {
      const searched = this.searchTarget();

      if (!searched) {
        return Phaser.Math.Vector2.ZERO;
      } else {
        this.target = searched;
      }
    }

    const distanceSq = this.myself.gameObject.body.position.distanceSq(this.target.gameObject.body.position);

    if (distanceSq > this.unaggroRadius * this.unaggroRadius) {
      this.target = null;
      return Phaser.Math.Vector2.ZERO;
    } else if (distanceSq < this.minRange) {
      return Phaser.Math.Vector2.ZERO;
    }

    const moveVector = this.calculateMovement(this.target.gameObject.body.position);

    return moveVector;
  }

  get attack(): Phaser.Math.Vector2 {
    return null;
  }

  private calculateMovement(targetPos: Phaser.Math.Vector2): Phaser.Math.Vector2 {
    if (this.myself.gameObject.body.position.distanceSq(targetPos) > this.unrushDistanceSq) {
      this.rushAtTarget = false;
    }

    if (this.rushAtTarget) {
      return new Phaser.Math.Vector2(targetPos)
        .subtract(this.myself.gameObject.body.position)
        .normalize();
    }

    this.timeSinceLastSearch += this.searchIncrement;

    if (!this.pathWaypoints || this.timeSinceLastSearch >= this.searchFrequency) {
      this.pathWaypoints = this.buildPathToTarget(targetPos);
      this.timeSinceLastSearch = 0;

      if (!this.pathWaypoints) {
        debugger;
      }
    }

    if (this.pathWaypoints.length === 0) {
      this.rushAtTarget = true;
      return Phaser.Math.Vector2.ZERO;
    } else if (this.pathWaypoints[0].distanceSq(this.myself.gameObject.body.position) < this.waypointReachedDistanceSq) {
      this.pathWaypoints.shift();

      if (this.pathWaypoints.length === 0) {
        this.rushAtTarget = true;
        return Phaser.Math.Vector2.ZERO;
      }
    }

    return new Phaser.Math.Vector2(this.pathWaypoints[0])
      .subtract(this.myself.gameObject.body.position)
      .normalize();
  }

  private buildPathToTarget(targetPos: Phaser.Math.Vector2): Phaser.Math.Vector2[] {
    const myPos = this.myself.gameObject.body.position;

    const gridLowerCorner = new Phaser.Math.Vector2(
      Math.floor((Math.min(myPos.x, targetPos.x) - this.aggroRadius) / Constants.Level.GRID_SIZE_X),
      Math.floor((Math.min(myPos.y, targetPos.y) - this.aggroRadius) / Constants.Level.GRID_SIZE_Y)
    );

    const gridUpperCorner = new Phaser.Math.Vector2(
      Math.ceil((Math.max(myPos.x, targetPos.x) + this.aggroRadius) / Constants.Level.GRID_SIZE_X),
      Math.ceil((Math.max(myPos.y, targetPos.y) + this.aggroRadius) / Constants.Level.GRID_SIZE_Y)
    );

    const gridSize = new Phaser.Math.Vector2(gridUpperCorner).subtract(gridLowerCorner);

    const matrix: number[][] = [];

    for (let i = 0; i <= gridSize.y; ++i) {
      matrix.push([]);

      for (let j = 0; j <= gridSize.x; ++j) {
        matrix[i].push(this.levelScene.mapGrid.getBlockAt(new Phaser.Math.Vector2(
          j + gridLowerCorner.x,
          i + gridLowerCorner.y
        )) ? 1 : 0);
      }
    }

    const grid = new PF.Grid(matrix);
    const finder = new PF.AStarFinder({
      diagonalMovement: DiagonalMovement.IfAtMostOneObstacle,
      weight: 1,
      heuristic: PF.Heuristic.euclidean
    });

    let path: number[][];

    const pathStart = new Phaser.Math.Vector2(
      Math.round(myPos.x / Constants.Level.GRID_SIZE_X) - gridLowerCorner.x,
      Math.round(myPos.y / Constants.Level.GRID_SIZE_Y) - gridLowerCorner.y
    );
    const pathFinish = new Phaser.Math.Vector2(
      Math.round(targetPos.x / Constants.Level.GRID_SIZE_X) - gridLowerCorner.x,
      Math.round(targetPos.y / Constants.Level.GRID_SIZE_Y) - gridLowerCorner.y
    );

    try {
      path = finder.findPath(
        pathStart.x,
        pathStart.y,
        pathFinish.x,
        pathFinish.y,
        grid
      );
    } catch {
      debugger;
    }

    if (this._DEBUG) {
      this._drawDebug(this.levelScene.debugGraphics, matrix, path, myPos, targetPos, gridLowerCorner);
    }

    if (!path) {
      return null;
    }

    path = PF.Util.compressPath(path);

    return path.map(point => new Phaser.Math.Vector2(
        (point[0] + gridLowerCorner.x) * Constants.Level.GRID_SIZE_X,
        (point[1] + gridLowerCorner.y) * Constants.Level.GRID_SIZE_Y
    ));
  }

  private searchTarget(): Entity {
    const myNumber = this.levelScene.entities.indexOf(this.myself);
    if (myNumber < 0) { throw new Error('I am not on the entities list!'); }

    const target = this.levelScene.physics.closest(
      this.myself.gameObject.body.position,
      this.levelScene.entities
        .filter((e, i) => !FactionsAreFriendly(this.myself.faction, e.faction) &&
          e.gameObject.body.position.distanceSq(this.myself.gameObject.body.position) < this.aggroRadius * this.aggroRadius &&
          (myNumber !== i))
        .map(e => e.gameObject)
    ) as Phaser.GameObjects.GameObject;

    if (!target) {
      return null;
    }

    const targetEntity = this.levelScene.entities.find(e => e.gameObject === target);

    if (!targetEntity) { throw new Error('Entity for closest GameObject not found!'); }

    return targetEntity;
  }

  private _drawDebug(
    gfx: GameObjects.Graphics,
    matrix: number[][],
    path: number[][],
    myPos: Phaser.Math.Vector2,
    targetPos: Phaser.Math.Vector2,
    gridLowerCorner: Phaser.Math.Vector2) {
    gfx.clear();

    path.forEach(p => {
      matrix[p[1]][p[0]] = 4;
    });

    matrix[Math.round(myPos.y / Constants.Level.GRID_SIZE_Y) - gridLowerCorner.y]
      [Math.round(myPos.x / Constants.Level.GRID_SIZE_X) - gridLowerCorner.x] = 2;
    matrix[Math.round(targetPos.y / Constants.Level.GRID_SIZE_Y) - gridLowerCorner.y]
      [Math.round(targetPos.x / Constants.Level.GRID_SIZE_X) - gridLowerCorner.x] = 3;

    matrix.forEach((row, i) => {

      row.forEach((cell, j) => {
        let color: number;
        switch (cell) {
          case 0:
            color = 0x00ff00;
            break;
          case 1:
            color = 0x00ffff;
            break;
          case 2:
            color = 0xff00ff;
            break;
          case 3:
            color = 0xffaa00;
            break;
          case 4:
            color = 0x000000;
            break;
        }
        gfx.fillStyle(color);
        gfx.fillRect(
          (j + gridLowerCorner.x) * Constants.Level.GRID_SIZE_X,
          (i + gridLowerCorner.y) * Constants.Level.GRID_SIZE_Y,
          Constants.Level.GRID_SIZE_X,
          Constants.Level.GRID_SIZE_Y
        );
      });
    });
  }
}
