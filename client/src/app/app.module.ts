import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './modules/materials.module';
import { GameCanvasComponent } from './components/game-canvas/game-canvas.component';
import { LevelEditorComponent } from './components/level-editor/level-editor.component';

const socketIoConfig: SocketIoConfig = {
  url: 'http://localhost:42069',
  options: {
    path: '/game-ws'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    GameCanvasComponent,
    LevelEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    SocketIoModule.forRoot(socketIoConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
