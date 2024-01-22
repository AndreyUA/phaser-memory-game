import * as Phaser from "phaser";

import { Card } from "../gameObjects/Card";
import { CARDS_ARRAY } from "../constants/cardsArray";

const CARD_ROWS = 2;
const CARD_COLS = 5;

export class MainScene extends Phaser.Scene {
  cards: Array<Card> = [];
  openedCard: Card | null = null;
  openedPairsCardCount: number = 0;
  timeoutText: Phaser.GameObjects.Text | null = null;

  constructor() {
    super({ key: "main" });
  }

  preload(): void {
    this.load.image("bg", "/background.png");
    this.load.image("card", "/card.png");
    this.load.image("card1", "/card1.png");
    this.load.image("card2", "/card2.png");
    this.load.image("card3", "/card3.png");
    this.load.image("card4", "/card4.png");
    this.load.image("card5", "/card5.png");
  }

  create(): void {
    this.createBackground();
    this.createText();
    this.createCards();
    this.start();
  }

  createText(): void {
    this.timeoutText = this.add.text(10, 330, "Time: 30", {
      font: "36px Comic Neue",
      color: "#ffffff",
    });
  }

  initCards(): void {
    const positions = this.getCardPositions();

    this.cards.forEach((card) => {
      const position = positions.pop()!;

      card.closeCard();
      card.setPosition(position.x, position.y);
    });
  }

  start(): void {
    this.openedCard = null;
    this.openedPairsCardCount = 0;
    this.initCards();
  }

  createBackground(): void {
    this.add.sprite(0, 0, "bg").setOrigin(0, 0);
  }

  createCards(): void {
    this.cards = [];

    for (const cardId of CARDS_ARRAY) {
      this.cards.push(new Card(this, cardId), new Card(this, cardId));
    }

    this.input.on(
      "gameobjectdown",
      (_event: Phaser.Input.Pointer, card: Phaser.GameObjects.Sprite) => {
        this.onCardLicked(this.input.activePointer, card);
        this.checkIfGameIsFinished();
      },
      this
    );
  }

  onCardLicked(
    _pointer: Phaser.Input.Pointer,
    card: Phaser.GameObjects.Sprite
  ): void {
    // Filter non-card sprites
    if (!(card instanceof Card)) {
      return;
    }

    // Filter opened cards
    if (card.isOpened) {
      return;
    }

    // If there is no saved and opened card before, open the card
    if (!this.openedCard) {
      this.openedCard = card;
      this.openedCard.openCard();

      return;
    }

    // If there is a saved and opened card before, compare the cards
    if (this.openedCard.cardId === card.cardId) {
      this.openedCard = null;
      this.openedPairsCardCount++;
    } else {
      this.openedCard.closeCard();
      this.openedCard = card;
    }

    // Open the card
    card.openCard();
  }

  checkIfGameIsFinished(): void {
    if (this.openedPairsCardCount === CARDS_ARRAY.length) {
      this.start();
    }
  }

  getCardPositions(): Array<{ x: number; y: number }> {
    const positions: Array<{ x: number; y: number }> = [];
    const cardMargin = 4;
    const cardTexture = this.textures.get("card").getSourceImage();
    const cardWidth = cardTexture.width + cardMargin;
    const cardHeight = cardTexture.height + cardMargin;
    const offsetX =
      (+this.sys.game.config.width - cardWidth * CARD_COLS) / 2 + cardWidth / 2;
    const offsetY =
      (+this.sys.game.config.height - cardHeight * CARD_ROWS) / 2 +
      cardHeight / 2;

    for (let row = 0; row < CARD_ROWS; row++) {
      for (let col = 0; col < CARD_COLS; col++) {
        positions.push({
          x: offsetX + col * cardWidth,
          y: offsetY + row * cardHeight,
        });
      }
    }

    // Shuffle the array of positions
    return Phaser.Utils.Array.Shuffle(positions);
  }
}
