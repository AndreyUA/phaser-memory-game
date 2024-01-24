import * as Phaser from "phaser";

export class Card extends Phaser.GameObjects.Sprite {
  cardId: number;
  scene: Phaser.Scene;
  isOpened: boolean = false;

  constructor(scene: Phaser.Scene, cardId: number) {
    super(scene, 0, 0, "card");
    this.scene = scene;
    this.scene.add.existing(this);
    this.cardId = cardId;

    this.setInteractive({ useHandCursor: true });
  }

  openCard(): void {
    this.isOpened = true;
    this.flipCard();
  }

  closeCard(): void {
    this.isOpened = false;
    this.flipCard();
  }

  flipCard(): void {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: "Linear",
      duration: 200,
      onComplete: () => {
        this.showCard();
      },
    });
  }

  showCard(): void {
    this.setTexture(this.isOpened ? `card${this.cardId}` : "card");

    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      ease: "Linear",
      duration: 200,
    });
  }
}
