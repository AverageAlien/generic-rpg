import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './modules/materials.module';
import { GameCanvasComponent } from './components/game-canvas/game-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
