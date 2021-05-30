import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './modules/materials.module';
import { GameCanvasComponent } from './components/game-canvas/game-canvas.component';
import { LevelEditorComponent } from './components/level-editor/level-editor.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    LevelEditorComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(socketIoConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
