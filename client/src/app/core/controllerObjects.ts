import { Observable, Subject } from 'rxjs';
import { Vector } from './geometryObjects';

export interface Controller {
  move: Vector; // unit vector expected
  attack: Vector;
}

export class PlayerController implements Controller {
  move = new Vector(0, 0);
  attack: Vector = null;
}
