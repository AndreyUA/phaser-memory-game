import * as Phaser from "phaser";

export interface CardData {
  x: number;
  y: number;
  delay: number;
}

export const INITIAL_COORDINATES: CardData = { x: -100, y: -100, delay: 0 };

export class Card extends Phaser.GameObjects.Sprite {
  cardId: number;
  scene: Phaser.Scene;
  isOpened: boolean = false;
  position: CardData = INITIAL_COORDINATES;

  constructor(scene: Phaser.Scene, cardId: number) {
    super(scene, INITIAL_COORDINATES.x, INITIAL_COORDINATES.y, "card");
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
    if (!this.isOpened) {
      return;
    }

    this.flipCard();
    this.isOpened = false;
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

  init(x: number, y: number, delay: number): void {
    this.position = { x, y, delay };
    this.closeCard();
    this.setPosition(INITIAL_COORDINATES.x, INITIAL_COORDINATES.y);
  }

  moveCard(x?: number, y?: number, callback?: () => void): void {
    this.scene.tweens.add({
      targets: this,
      x: x ?? this.position.x,
      y: y ?? this.position.y,
      delay: this.position.delay,
      ease: "Linear",
      duration: 300,
      onComplete: () => {
        callback?.();
      },
    });
  }
}
