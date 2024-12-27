export default class StartScene extends Phaser.Scene {

  constructor() {
    super('StartScene');
    this.musicStarted = false;
  }

  preload() {
    this.load.audio('backgroundMusic', 'assets/sounds/background.mp3');
    this.load.image('title', 'assets/images/title.png');
  }

  create() {
    const canvasWidth = this.scale.width;
    const canvasHeight = this.scale.height;

    this.background = this.add.sprite(
      canvasWidth / 2,
      canvasHeight / 2,
      'background'
    );
    this.background.setOrigin(0.5, 0.5);
    this.background.setScale(
      Math.max(
        canvasWidth / this.background.width,
        canvasHeight / this.background.height
      )
    );

    const titleFinalY = canvasHeight * 0.2;
    this.title = this.add.sprite(canvasWidth / 2, -100, 'title');
    this.title.setOrigin(0.5, 0.5);

    const titleMaxWidth = canvasWidth * 0.8;
    const titleScale = titleMaxWidth / this.title.width;
    this.title.setScale(titleScale);

    this.tweens.add({
      targets: this.title,
      y: titleFinalY,
      duration: 5000,
      ease: 'Bounce.easeOut',
    });

    const startButton = this.add
      .text(canvasWidth / 2, canvasHeight / 2 + 150, 'Start', {
        fontSize: '48px',
        fontFamily: 'Comic Sans MS',
        color: '#FFFFFF',
        fontStyle: 'bold',
        backgroundColor: '#FF5733',
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive();

    startButton.on('pointerdown', () => {
      if (!this.musicStarted) {
        this.backgroundMusic = this.sound.add('backgroundMusic', {
          loop: true,
          volume: 2,
        });
        this.backgroundMusic.play();
        this.musicStarted = true;
      }

      this.scene.start('PreloadScene');
    });

    startButton.on('pointerover', () => {
      startButton.setStyle({ backgroundColor: '#FF7844' });
    });
    startButton.on('pointerout', () => {
      startButton.setStyle({ backgroundColor: '#FF5733' });
    });
  }
}
