import { adjustHitbox } from '../utils';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        const canvasWidth = this.scale.width;
        const canvasHeight = this.scale.height;

        this.background = this.add.sprite(canvasWidth / 2, canvasHeight / 2, 'background');
        this.background.setOrigin(0.5, 0.5);
        const scaleX = canvasWidth / this.background.width;
        const scaleY = canvasHeight / this.background.height;
        const scale = Math.max(scaleX, scaleY);
        this.background.setScale(scale);

        this.ground = this.add.tileSprite(0, canvasHeight, canvasWidth, 64, 'ground');
        this.ground.setOrigin(0, 1);

        this.physics.add.existing(this.ground, true); // Suelo estático

        const titleY = canvasHeight * 0.2;
        this.title = this.add.sprite(canvasWidth / 2, titleY, 'title');
        this.title.setOrigin(0.5, 0.5);
        const titleMaxWidth = canvasWidth * 0.8;
        const titleScale = titleMaxWidth / this.title.width;
        this.title.setScale(titleScale);
        this.tweens.add({
            targets: this.title,
            scale: {
                from: titleScale,
                to: titleScale * 1.1, // Incremento leve en el tamaño
            },
            duration: 3000, // Duración de cada latido
            yoyo: true,
            loop: -1, // Repetir infinitamente
            ease: 'Sine.easeInOut', // Efecto suave
        });

        this.player = this.physics.add.sprite(100, canvasHeight - 150, 'player');
        this.player.setScale(0.1);
        adjustHitbox(this.player);
        this.player.setBounce(0.6);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.ground);

        this.cheeses = this.physics.add.group();
        this.obstacles = this.physics.add.group();

        this.time.addEvent({
            delay: 1500,
            callback: this.spawnCheese,
            callbackScope: this,
            loop: true,
        });

        this.time.addEvent({
            delay: 3500,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true,
        });

        this.physics.add.collider(this.cheeses, this.ground);
        this.physics.add.collider(this.obstacles, this.ground);
        this.physics.add.overlap(this.player, this.cheeses, this.collectCheese, null, this);
        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);

        const buttonScale = 0.2;

        this.leftButton = this.add.sprite(50, canvasHeight - 50, 'leftButton').setInteractive().setScale(buttonScale);
        this.rightButton = this.add.sprite(150, canvasHeight - 50, 'rightButton').setInteractive().setScale(buttonScale);
        this.jumpButton = this.add.sprite(canvasWidth - 50, canvasHeight - 50, 'jumpButton').setInteractive().setScale(buttonScale);

        this.isMovingLeft = false;
        this.isMovingRight = false;

        const animateButton = (button, scale) => {
            this.tweens.add({
                targets: button,
                scale: scale,
                duration: 100,
                ease: 'Power2',
            });
        };

        this.leftButton.on('pointerdown', () => {
            this.isMovingLeft = true;
            animateButton(this.leftButton, buttonScale * 0.9);
        });
        this.leftButton.on('pointerup', () => {
            this.isMovingLeft = false;
            animateButton(this.leftButton, buttonScale);
        });

        this.rightButton.on('pointerdown', () => {
            this.isMovingRight = true;
            animateButton(this.rightButton, buttonScale * 0.9);
        });
        this.rightButton.on('pointerup', () => {
            this.isMovingRight = false;
            animateButton(this.rightButton, buttonScale);
        });

        this.jumpButton.on('pointerdown', () => {
            if (this.player.body.touching.down) {
                this.player.setVelocityY(-350);
            }
            animateButton(this.jumpButton, buttonScale * 0.9);
        });
        this.jumpButton.on('pointerup', () => {
            animateButton(this.jumpButton, buttonScale);
        });
        this.cursors = this.input.keyboard.createCursorKeys();

        this.score = 0;
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
            fontFamily: 'Comic Sans MS',
            fontSize: '30px',
            fontStyle: 'bold',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3,
        });
        this.cheeseIcon = this.add.sprite(100, 25, 'cheese')
        .setScale(0.08)
        .setOrigin(0.5, 0.5); 

        this.alignScoreAndCheese();


        this.scale.on('resize', this.onResize, this);

    }

    update() {
        this.ground.tilePositionX += 2;

        const speed = 200;
        if (this.isMovingLeft) {
            this.player.setVelocityX(-speed);
        } else if (this.isMovingRight) {
            this.player.setVelocityX(speed);
        } else {
            this.player.setVelocityX(0);
        }

        if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.player.body.touching.down) {
            this.player.setVelocityY(-350);
        }

        this.cheeses.getChildren().forEach((cheese) => {
            if (cheese.x < -50) cheese.destroy();
        });

        this.obstacles.getChildren().forEach((obstacle) => {
            if (obstacle.x < -50) obstacle.destroy();
        });
    }

    spawnCheese() {
        const x = this.scale.width + 50;
        const y = Phaser.Math.Between(50, this.scale.height * 0.8);
        const cheese = this.cheeses.create(x, y, 'cheese');
        cheese.setScale(0.1);
        cheese.setBounce(0);
        cheese.setVelocityX(-150);
        cheese.body.gravity.y = 500;
        cheese.setCollideWorldBounds(false);
    }

    spawnObstacle() {
        const x = this.scale.width + 50;
        const y = Phaser.Math.Between(50, this.scale.height * 0.8);
        const obstacle = this.obstacles.create(x, y, 'obstacle');
        obstacle.setScale(0.1);
        obstacle.setBounce(0.3);
        obstacle.setVelocityX(-100);
        obstacle.body.gravity.y = 500;
        obstacle.setCollideWorldBounds(false);
    }

    collectCheese(player, cheese) {
        cheese.destroy();
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        this.alignScoreAndCheese();

        this.tweens.add({
            targets: [this.cheeseIcon],
            scale: 0.3,
            duration: 200,
            yoyo: true,
            ease: 'Power2',
        });
        
    }

    hitObstacle(player, obstacle) {
        obstacle.destroy();
        this.score -= 20;
        if (this.score < 0) this.score = 0;
        this.scoreText.setText(`Score: ${this.score}`);
        this.alignScoreAndCheese();
    }

    alignScoreAndCheese() {
        const canvasWidth = this.scale.width;
        const canvasHeight = this.scale.height;

        this.scoreText.setPosition(canvasWidth * 0.05, canvasHeight * 0.02);
        
        this.cheeseIcon.setPosition(
            this.scoreText.x + this.scoreText.displayWidth + canvasWidth * 0.07,
            this.scoreText.y + this.scoreText.displayHeight / 2 
        );
    }

    onResize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;

        
        this.background.setScale(Math.max(width / this.background.width, height / this.background.height));
        this.scoreText.setFontSize(`${height * 0.04}px`);
        this.alignScoreAndCheese();
    }
}
