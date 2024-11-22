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
        this.load.audio('backgroundMusic', 'assets/sounds/background.mp3');
    }

    create() {
        this.scene.start('GameScene');
    }
}
