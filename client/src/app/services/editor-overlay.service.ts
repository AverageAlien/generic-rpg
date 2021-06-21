import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorOverlayService {
  selectedLeftMouseBlock: string = null;
  selectedRightMouseBlock: string = null;

  constructor() { }
}
