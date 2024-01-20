import * as Phaser from "phaser";

export class Card extends Phaser.GameObjects.Sprite {
  cardId: number;
  scene: Phaser.Scene;
  isOpened: boolean = false;

  constructor(scene: Phaser.Scene, cardId: number) {
    super(scene, 0, 0, "card");
    this.scene = scene;
    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.cardId = cardId;

    this.setInteractive({ useHandCursor: true });
  }

  openCard(): void {
    this.setTexture(`card${this.cardId}`);
    this.isOpened = true;
  }

  closeCard(): void {
    this.setTexture("card");
    this.isOpened = false;
  }
}
