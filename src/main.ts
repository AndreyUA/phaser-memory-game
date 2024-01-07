import "./style.css";

import * as Phaser from "phaser";

console.log("test log");

const scene: Phaser.Types.Scenes.SceneType = new Phaser.Scene("main");
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene,
};

new Phaser.Game(config);
