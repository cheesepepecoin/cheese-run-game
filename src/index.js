import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';
import StartScene from './scenes/StartScene';
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const config = {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: '',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  fps: {
    target: 30,
    forceSetTimeOut: true,
  },
  scene: [StartScene, PreloadScene, GameScene],
};

new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});