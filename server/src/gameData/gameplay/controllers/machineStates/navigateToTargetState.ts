import PF, { DiagonalMovement } from 'pathfinding';
import { Constants } from '../../../../core/constants';
import { BaseState } from './baseState';

export class NavigateToTargetState extends BaseState {
  private readonly searchFrequency = 250; // ms
  private readonly searchIncrement = 16.67; // 1000ms / 60
  private timeSinceLastSearch = 0;

  private pathWaypoints: Phaser.Math.Vector2[] = null;
  private readonly waypointReachedDistanceSq = Math.pow(
    Math.min(Constants.Level.GRID_SIZE_X, Constants.Level.GRID_SIZE_Y) * 0.7,
  2);

  public movement(): Phaser.Math.Vector2 {
    return this.calculateMovement(this.controller.target.pos);
  }
  public attack(): Phaser.Math.Vector2 {
    return null;
  }

  private calculateMovement(targetPos: Phaser.Math.Vector2): Phaser.Math.Vector2 {
    this.timeSinceLastSearch += this.searchIncrement;

    if (!this.pathWaypoints || this.timeSinceLastSearch >= this.searchFrequency) {
      this.pathWaypoints = this.buildPathToTarget(targetPos);
      this.timeSinceLastSearch = 0;
    }

    if (this.pathWaypoints.length === 0) {
      return Phaser.Math.Vector2.ZERO;
    } else if (this.pathWaypoints[0].distanceSq(this.myself.gameObject.body.position) < this.waypointReachedDistanceSq) {
      this.pathWaypoints.shift();

      if (this.pathWaypoints.length === 0) {
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
      Math.floor((Math.min(myPos.x, targetPos.x) - this.sightRange()) / Constants.Level.GRID_SIZE_X),
      Math.floor((Math.min(myPos.y, targetPos.y) - this.sightRange()) / Constants.Level.GRID_SIZE_Y)
    );

    const gridUpperCorner = new Phaser.Math.Vector2(
      Math.ceil((Math.max(myPos.x, targetPos.x) + this.sightRange()) / Constants.Level.GRID_SIZE_X),
      Math.ceil((Math.max(myPos.y, targetPos.y) + this.sightRange()) / Constants.Level.GRID_SIZE_Y)
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
      diagonalMovement: DiagonalMovement.OnlyWhenNoObstacles,
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

    path = finder.findPath(
      pathStart.x,
      pathStart.y,
      pathFinish.x,
      pathFinish.y,
      grid
    );

    if (!path) {
      return null;
    }

    path = PF.Util.compressPath(path);

    return path.map(point => new Phaser.Math.Vector2(
        (point[0] + gridLowerCorner.x) * Constants.Level.GRID_SIZE_X,
        (point[1] + gridLowerCorner.y) * Constants.Level.GRID_SIZE_Y
    ));
  }

}