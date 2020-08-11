import { Controller } from '../controllers/baseController';
import { Observable } from 'rxjs';
import { GameObjects } from 'phaser';
import { Faction } from 'src/app/core/factions';

export interface Entity {
  name: string;
  faction: Faction;
  gameObject: GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body };

  update(): void;
}

export interface Controllable extends Entity {
  controller: Controller;
  speed: number;
}

export interface Destroyable extends Entity {
  health: number;
  maxHealth: number;
  destroyed: Observable<void>;

  damage(dmg: number): void;

  destroy(): void;
}
