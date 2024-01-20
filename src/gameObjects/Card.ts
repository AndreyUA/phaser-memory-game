import * as Phaser from "phaser";

export class Card extends Phaser.GameObjects.Sprite {
  cardId: number;
  scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    cardId: number,
    position: { x: number; y: number }
  ) {
    super(scene, position.x, position.y, "card");
    this.scene = scene;
    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.cardId = cardId;

    this.setInteractive({ useHandCursor: true });
  }

  openCard(): void {
    this.setTexture(`card${this.cardId}`);
  }
}
