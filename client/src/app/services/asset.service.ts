import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  public static loadBlockSprites(loader: Phaser.Loader.LoaderPlugin): void {
    loader.image('grass01', 'assets/textures/grass01.png');
    loader.image('stone_wall01', 'assets/textures/stone_wall01.png');
    loader.image('stone_floor01', 'assets/textures/stone_floor01.png');
  }
}
