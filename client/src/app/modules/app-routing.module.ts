import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LevelEditorComponent } from '../components/level-editor/level-editor.component';
import { GameCanvasComponent } from '../components/game-canvas/game-canvas.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { AuthGuard } from '../services/auth.guard';


const routes: Routes = [
  {
    path: 'editor',
    component: LevelEditorComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    component: GameCanvasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
