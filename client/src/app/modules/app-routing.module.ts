import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LevelEditorComponent } from '../components/level-editor/level-editor.component';
import { GameCanvasComponent } from '../components/game-canvas/game-canvas.component';


const routes: Routes = [
  {
    path: 'editor',
    component: LevelEditorComponent
  },
  {
    path: '',
    component: GameCanvasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
