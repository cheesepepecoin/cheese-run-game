export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('title', 'assets/images/title.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('obstacle', 'assets/images/obstacle.png');
    this.load.image('cheese', 'assets/images/cheese.png');
    this.load.image('background', 'assets/images/background.jpg');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('leftButton', 'assets/images/button-left.png');
    this.load.image('rightButton', 'assets/images/button-right.png');
    this.load.image('jumpButton', 'assets/images/button-jump.png');
  }

  create() {
    this.scene.start('GameScene');
  }
}
