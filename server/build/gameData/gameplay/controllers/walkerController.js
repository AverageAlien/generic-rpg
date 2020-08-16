import PF, { DiagonalMovement } from 'pathfinding';
import { Constants } from '../../../core/constants';
import { ClientLevel } from '../../../gameData/scenes/clientLevel';
import { FactionsAreFriendly } from '../../../core/factions';
export class WalkerController {
    constructor(myself, levelScene, aggroRadius = 256, unaggroRadius = aggroRadius * Math.SQRT2, minRange = 64) {
        this.myself = myself;
        this.levelScene = levelScene;
        this.aggroRadius = aggroRadius;
        this.unaggroRadius = unaggroRadius;
        this.minRange = minRange;
        this.target = null;
        this.searchFrequency = 250; // ms
        this.searchIncrement = 16.67;
        this.timeSinceLastSearch = 0;
        this.pathWaypoints = null;
        this.rushAtTarget = false;
        this.unrushDistanceSq = Math.pow(Math.min(Constants.Level.GRID_SIZE_Y, Constants.Level.GRID_SIZE_X) * 2, 2);
        this.waypointReachedDistanceSq = Math.pow(Math.min(Constants.Level.GRID_SIZE_X, Constants.Level.GRID_SIZE_Y) * 0.7, 2);
        this._DEBUG = false;
    }
    get movement() {
        if (!this.target || !this.target.gameObject || !this.target.gameObject.body) {
            const searched = this.searchTarget();
            if (!searched) {
                return Phaser.Math.Vector2.ZERO;
            }
            else {
                this.target = searched;
            }
        }
        const distanceSq = this.myself.gameObject.body.position.distanceSq(this.target.gameObject.body.position);
        if (distanceSq > this.unaggroRadius * this.unaggroRadius) {
            this.target = null;
            return Phaser.Math.Vector2.ZERO;
        }
        else if (distanceSq < this.minRange) {
            return Phaser.Math.Vector2.ZERO;
        }
        const moveVector = this.calculateMovement(this.target.gameObject.body.position);
        return moveVector;
    }
    get attack() {
        return null;
    }
    calculateMovement(targetPos) {
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
        }
        else if (this.pathWaypoints[0].distanceSq(this.myself.gameObject.body.position) < this.waypointReachedDistanceSq) {
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
    buildPathToTarget(targetPos) {
        const myPos = this.myself.gameObject.body.position;
        const gridLowerCorner = new Phaser.Math.Vector2(Math.floor((Math.min(myPos.x, targetPos.x) - this.aggroRadius) / Constants.Level.GRID_SIZE_X), Math.floor((Math.min(myPos.y, targetPos.y) - this.aggroRadius) / Constants.Level.GRID_SIZE_Y));
        const gridUpperCorner = new Phaser.Math.Vector2(Math.ceil((Math.max(myPos.x, targetPos.x) + this.aggroRadius) / Constants.Level.GRID_SIZE_X), Math.ceil((Math.max(myPos.y, targetPos.y) + this.aggroRadius) / Constants.Level.GRID_SIZE_Y));
        const gridSize = new Phaser.Math.Vector2(gridUpperCorner).subtract(gridLowerCorner);
        const matrix = [];
        for (let i = 0; i <= gridSize.y; ++i) {
            matrix.push([]);
            for (let j = 0; j <= gridSize.x; ++j) {
                matrix[i].push(this.levelScene.mapGrid.getBlockAt(new Phaser.Math.Vector2(j + gridLowerCorner.x, i + gridLowerCorner.y)) ? 1 : 0);
            }
        }
        const grid = new PF.Grid(matrix);
        const finder = new PF.AStarFinder({
            diagonalMovement: DiagonalMovement.IfAtMostOneObstacle,
            weight: 1,
            heuristic: PF.Heuristic.euclidean
        });
        let path;
        const pathStart = new Phaser.Math.Vector2(Math.round(myPos.x / Constants.Level.GRID_SIZE_X) - gridLowerCorner.x, Math.round(myPos.y / Constants.Level.GRID_SIZE_Y) - gridLowerCorner.y);
        const pathFinish = new Phaser.Math.Vector2(Math.round(targetPos.x / Constants.Level.GRID_SIZE_X) - gridLowerCorner.x, Math.round(targetPos.y / Constants.Level.GRID_SIZE_Y) - gridLowerCorner.y);
        try {
            path = finder.findPath(pathStart.x, pathStart.y, pathFinish.x, pathFinish.y, grid);
        }
        catch (_a) {
            debugger;
        }
        if (this._DEBUG && this.levelScene instanceof ClientLevel) {
            this._drawDebug(this.levelScene.debugGraphics, matrix, path, myPos, targetPos, gridLowerCorner);
        }
        if (!path) {
            return null;
        }
        path = PF.Util.compressPath(path);
        return path.map(point => new Phaser.Math.Vector2((point[0] + gridLowerCorner.x) * Constants.Level.GRID_SIZE_X, (point[1] + gridLowerCorner.y) * Constants.Level.GRID_SIZE_Y));
    }
    searchTarget() {
        const myNumber = this.levelScene.entities.indexOf(this.myself);
        if (myNumber < 0) {
            throw new Error('I am not on the entities list!');
        }
        const target = this.levelScene.physics.closest(this.myself.gameObject.body.position, this.levelScene.entities
            .filter((e, i) => !FactionsAreFriendly(this.myself.faction, e.faction) &&
            e.gameObject.body.position.distanceSq(this.myself.gameObject.body.position) < this.aggroRadius * this.aggroRadius &&
            (myNumber !== i))
            .map(e => e.gameObject));
        if (!target) {
            return null;
        }
        const targetEntity = this.levelScene.entities.find(e => e.gameObject === target);
        if (!targetEntity) {
            throw new Error('Entity for closest GameObject not found!');
        }
        return targetEntity;
    }
    _drawDebug(gfx, matrix, path, myPos, targetPos, gridLowerCorner) {
        gfx.clear();
        path.forEach(p => {
            matrix[p[1]][p[0]] = 4;
        });
        matrix[Math.round(myPos.y / Constants.Level.GRID_SIZE_Y) - gridLowerCorner.y][Math.round(myPos.x / Constants.Level.GRID_SIZE_X) - gridLowerCorner.x] = 2;
        matrix[Math.round(targetPos.y / Constants.Level.GRID_SIZE_Y) - gridLowerCorner.y][Math.round(targetPos.x / Constants.Level.GRID_SIZE_X) - gridLowerCorner.x] = 3;
        matrix.forEach((row, i) => {
            row.forEach((cell, j) => {
                let color;
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
                gfx.fillRect((j + gridLowerCorner.x) * Constants.Level.GRID_SIZE_X, (i + gridLowerCorner.y) * Constants.Level.GRID_SIZE_Y, Constants.Level.GRID_SIZE_X, Constants.Level.GRID_SIZE_Y);
            });
        });
    }
}
//# sourceMappingURL=walkerController.js.map