import { Observable, Subject } from 'rxjs';
import { Vector } from './geometryObjects';

export interface Controller {
  move: Observable<Vector>; // unit vector expected
  attack: Observable<Vector>;
}

export class PlayerController implements Controller {
  move$: Subject<Vector> = new Subject<Vector>();
  attack$: Subject<Vector> = new Subject<Vector>();

  get move(): Observable<Vector> {
    return this.move$.asObservable();
  }

  get attack(): Observable<Vector> {
    return this.attack$.asObservable();
  }
}
