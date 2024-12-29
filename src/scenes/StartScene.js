export default class StartScene extends Phaser.Scene {
    constructor() {
      super('StartScene');
      this.musicStarted = false;
    }
  
    preload() {
      this.load.audio('backgroundMusic', 'assets/sounds/background.mp3');
      this.load.image('title', 'assets/images/title.png');
      this.load.image('background', 'assets/images/background.jpg');
      this.load.image('cherub', 'assets/images/cherub.png');
      this.load.image('underpantsCheese', 'assets/images/underpants_cheese.png');
      this.load.image('astronaut', 'assets/images/astronaut.png');
    }
  
    create() {
      const canvasWidth = this.scale.width;
      const canvasHeight = this.scale.height;
  
      // Fondo
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
  
      // Título
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
  
      // Botón "Start"
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
  
      // Imagen: cherub (arriba derecha con efecto de latido)
      this.cherub = this.add.sprite(canvasWidth * 0.8, canvasHeight * 0.05, 'cherub');
      this.cherub.setOrigin(0.5, 0.5);
      const cherubScale = Math.min(canvasWidth, canvasHeight) * 0.001;
      this.cherub.setScale(cherubScale);
  
      this.tweens.add({
        targets: this.cherub,
        scale: cherubScale * 1.2,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
  
      // Imagen: underpantsCheese (movimiento izquierda a derecha, detrás de todo)
      this.underpantsCheese = this.add.sprite(-100, canvasHeight * 0.8, 'underpantsCheese');
      this.underpantsCheese.setOrigin(0.5, 0.5);
      const underpantsScale = Math.min(canvasWidth, canvasHeight) * 0.0005;
      this.underpantsCheese.setScale(underpantsScale);
      this.underpantsCheese.setDepth(0); // Detrás de todo
  
      this.tweens.add({
        targets: this.underpantsCheese,
        x: canvasWidth + 100,
        duration: 5000,
        repeat: -1,
        ease: 'Linear',
        onRepeat: () => {
          this.underpantsCheese.x = -100; // Reiniciar posición al repetir
        },
      });
  
      // Imagen: astronaut (rotación fija en la esquina inferior derecha)
      this.astronaut = this.add.sprite(canvasWidth * 0.9, canvasHeight * 0.9, 'astronaut');
      this.astronaut.setOrigin(0.5, 0.5);
      const astronautScale = Math.min(canvasWidth, canvasHeight) * 0.001;
      this.astronaut.setScale(astronautScale);
  
      this.tweens.add({
        targets: this.astronaut,
        angle: 360,
        duration: 3000,
        repeat: -1,
        ease: 'Linear',
      });
  
      // Escucha cambios de tamaño para redimensionar los elementos
      this.scale.on('resize', this.resize, this);
    }
  
    resize(gameSize) {
      const width = gameSize.width;
      const height = gameSize.height;
  
      // Redimensionar fondo
      this.background.setPosition(width / 2, height / 2);
      this.background.setScale(
        Math.max(width / this.background.width, height / this.background.height)
      );
  
      // Redimensionar y reposicionar elementos dinámicos
      this.cherub.setPosition(width * 0.8, height * 0.05);
      this.cherub.setScale(Math.min(width, height) * 0.001);
  
      this.underpantsCheese.setPosition(this.underpantsCheese.x, height * 0.8);
      this.underpantsCheese.setScale(Math.min(width, height) * 0.0004);
  
      this.astronaut.setPosition(width * 0.25, height * 0.9);
      this.astronaut.setScale(Math.min(width, height) * 0.001);
    }
  }
  