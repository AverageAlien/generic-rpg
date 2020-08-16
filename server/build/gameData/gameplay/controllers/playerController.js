export class PlayerController {
    constructor(inputKeys) {
        this.inputKeys = inputKeys;
    }
    get movement() {
        return new Phaser.Math.Vector2(-this.inputKeys.left.isDown || +this.inputKeys.right.isDown, -this.inputKeys.up.isDown || +this.inputKeys.down.isDown).normalize();
    }
    get attack() {
        return null;
    }
}
//# sourceMappingURL=playerController.js.map