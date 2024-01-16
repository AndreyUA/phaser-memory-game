import * as Phaser from "phaser";

const CARD_ROWS = 2;
const CARD_COLS = 5;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }

  preload(): void {
    this.load.image("bg", "/background.png");
    this.load.image("card", "/card.png");
  }

  create(): void {
    this.add.sprite(0, 0, "bg").setOrigin(0, 0);
    this.getCardPositions().forEach((position) => {
      this.add.sprite(position.x, position.y, "card").setOrigin(0, 0);
    });
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
