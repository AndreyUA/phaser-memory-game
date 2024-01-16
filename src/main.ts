import "./style.css";

import * as Phaser from "phaser";

import { MainScene } from "./scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [MainScene],
};

new Phaser.Game(config);
