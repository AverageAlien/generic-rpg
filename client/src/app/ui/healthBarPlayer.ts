import { ClientLevel } from '../scenes/clientLevel';

export class HealthBarPlayer extends Phaser.GameObjects.DOMElement {
  private static readonly elementHTML = `
    <div style='
      background-color: #383838;
      border: 2px solid black;
      box-sizing: content-box;
      width: 128px;
      height: 16px;
    '>
      <div id='full' style='
        height: 100%;
        width: 0%;
        display: flex;
        flex-flow: column nowrap;
      '>
        <div style='
          height: 100%;
          width: 100%;
          background-color: red;
        '></div>
        <div style='
          height: 40%;
          background-color: black;
          opacity: 0.3;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
        '></div>
      </div>
      <div id='label' style='
        color: white;
        font-size: 16px;
        position: absolute;
        top: 2px;
        left: 2px;
        right: 2px;
        bottom: 2px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
      '>
        0/0
      </div>
    </div>
  `;

  constructor(private levelScene: ClientLevel) {
    super(
      levelScene,
      70,
      14,
      'div'
    );
    this.setHTML(HealthBarPlayer.elementHTML);
    this.setScrollFactor(0);
    this.setDepth(15);

    levelScene.add.existing(this);
  }

  update(time: number, delta: number) {
    const plr = this.levelScene.player;

    const bar = this.getChildByID('full') as HTMLElement;
    const label = this.getChildByID('label') as HTMLElement;

    if (!plr) {
      return;
    }

    bar.style.width = `${Math.max(Math.min(100, plr.health / plr.maxHealth * 100), 0)}%`;

    label.innerText = `${plr.health}/${plr.maxHealth}`;
  }
}
