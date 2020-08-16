import { MapGrid } from './mapGrid';
import { Entity } from '../gameData/gameplay/entities/baseEntity';

export interface LevelScene extends Phaser.Scene {
  mapGrid: MapGrid;
  levelName: string;
  entities: Entity[];
}
