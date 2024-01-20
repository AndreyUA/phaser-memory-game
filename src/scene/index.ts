import * as Phaser from "phaser";

import { Card } from "../gameObjects/Card";
import { CARDS_ARRAY } from "../constants/cardsArray";

const CARD_ROWS = 2;
const CARD_COLS = 5;

export class MainScene extends Phaser.Scene {
  cards: Array<Card> = [];

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

    this.createCards();
  }

  createBackground(): void {
    this.add.sprite(0, 0, "bg").setOrigin(0, 0);
  }

  createCards(): void {
    this.cards = [];
    const positions = this.getCardPositions();

    // Shuffle the array of positions
    Phaser.Utils.Array.Shuffle(positions);

    for (const cardId of CARDS_ARRAY) {
      this.cards.push(
        new Card(this, cardId, positions.pop()!),
        new Card(this, cardId, positions.pop()!)
      );
    }
  }

  getCardPositions(): Array<{ x: number; y: number }> {
    const positions: Array<{ x: number; y: number }> = [];
    const cardMargin = 4;
    const cardTexture = this.textures.get("card").getSourceImage();
    const cardWidth = cardTexture.width + cardMargin;
    const cardHeight = cardTexture.height + cardMargin;
    const offsetX = (+this.sys.game.config.width - cardWidth * CARD_COLS) / 2;
    const offsetY = (+this.sys.game.config.height - cardHeight * CARD_ROWS) / 2;

    for (let row = 0; row < CARD_ROWS; row++) {
      for (let col = 0; col < CARD_COLS; col++) {
        positions.push({
          x: offsetX + col * cardWidth,
          y: offsetY + row * cardHeight,
        });
      }
    }

    return positions;
  }
}
