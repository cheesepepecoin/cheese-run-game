export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.isProduction = process.env.NODE_ENV === 'production';
        this.assetsPath = this.isProduction ? '/assets/' : '/public/assets/';
    }

    preload() {
        this.load.image('title', '${assetsPath}images/title.png');
        this.load.image('player', '${assetsPath}images/player.png');
        this.load.image('obstacle', '${assetsPath}images/obstacle.png');
        this.load.image('cheese', '${assetsPath}images/cheese.png');
        this.load.image('background', '${assetsPath}images/background.jpg');
        this.load.image('ground', '${assetsPath}images/ground.png');
        this.load.image('leftButton', '${assetsPath}images/button-left.png');
        this.load.image('rightButton', '${assetsPath}images/button-right.png');
        this.load.image('jumpButton', '${assetsPath}images/button-jump.png');
    }

    create() {
        this.scene.start('GameScene');
    }
}
