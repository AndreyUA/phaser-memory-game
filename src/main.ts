import "./style.css";

import * as Phaser from "phaser";

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }

  preload() {
    console.log("preload method");
  }

  create() {
    console.log("create method");
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [MainScene],
};

new Phaser.Game(config);
