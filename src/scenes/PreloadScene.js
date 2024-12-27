export default class PreloadScene extends Phaser.Scene {
    
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('title', 'public/assets/images/title.png');
    this.load.image('player', 'public/assets/images/player.png');
    this.load.image('obstacle', 'public/assets/images/obstacle.png');
    this.load.image('cheese', 'public/assets/images/cheese.png');
    this.load.image('background', 'public/assets/images/background.jpg');
    this.load.image('ground', 'public/assets/images/ground.png');
    this.load.image('leftButton', 'public/assets/images/button-left.png');
    this.load.image('rightButton', 'public/assets/images/button-right.png');
    this.load.image('jumpButton', 'public/assets/images/button-jump.png');
  }

  create() {
    this.scene.start('GameScene');
  }
}
