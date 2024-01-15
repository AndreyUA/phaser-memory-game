import "./style.css";

import * as Phaser from "phaser";

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }

  preload() {
    this.load.image("bg", "/background.png");
  }

  create() {
    this.add.sprite(0, 0, "bg").setOrigin(0, 0);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [MainScene],
};

new Phaser.Game(config);
