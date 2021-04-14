import { ClientLevel } from '../scenes/clientLevel';

export class EntityRendererService {
  private static levelScene: ClientLevel;

  public static init(clientLevel: ClientLevel) {
    this.levelScene = clientLevel;
  }

  public static drawArmorItem(textureName: string, gameObject: Phaser.GameObjects.RenderTexture) {
    const texture = this.levelScene.textures.getFrame(textureName);

    gameObject.draw(texture,
      gameObject.width / 2 - texture.width / 2,
      gameObject.height / 2 - Math.ceil(texture.height / 2) + 3);
  }
}
