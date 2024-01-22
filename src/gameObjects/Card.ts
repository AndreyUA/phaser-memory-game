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
    this.flipCard(`card${this.cardId}`);
  }

  closeCard(): void {
    this.flipCard("card");
    this.isOpened = false;
  }

  flipCard(texture: string): void {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: "Linear",
      duration: 200,
      onComplete: () => {
        this.showCard(texture);
      },
    });
  }

  showCard(texture: string): void {
    this.setTexture(texture);

    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      ease: "Linear",
      duration: 200,
    });
  }
}
