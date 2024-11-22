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
        this.groundGroup = this.physics.add.staticGroup();

        const groundWidth = 64;
        const groundHeightRatio = 0.95;
        const groundY = window.innerHeight * groundHeightRatio;
        for (let i = 0; i < Math.ceil(canvasWidth / groundWidth); i++) {
            this.groundGroup.create(i * groundWidth, groundY, 'ground').setOrigin(0, 0.5).refreshBody();
        }
        const titleHeightRatio = 2;
        const titleY = window.innerHeight * 0.2;
        const title = this.add.sprite(this.scale.width / 2, titleY, 'title');
        title.setOrigin(0.5, 0.9);
        const titleMaxWidth = this.scale.width * 0.8;
        const titleScale = titleMaxWidth / title.width;
        title.setScale(titleScale);
        this.player = this.physics.add.sprite(100, groundY - 150, 'player');
        this.player.setScale(0.1);
        adjustHitbox(this.player);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.groundGroup);

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

        this.physics.add.collider(this.cheeses, this.groundGroup);
        this.physics.add.overlap(this.player, this.cheeses, this.collectCheese, null, this);

        this.physics.add.collider(this.obstacles, this.groundGroup);
        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.on('pointerdown', (pointer) => {
        this.backgroundMusic = this.sound.add('backgroundMusic', {
            loop: true,
            volume: 2,
        });
        this.backgroundMusic.play();
            const screenWidth = this.scale.width;
            const touchX = pointer.x;

            if (touchX < screenWidth / 3) {
                this.player.setVelocityX(-200);
            } else if (touchX > (screenWidth / 3) * 2) {
                this.player.setVelocityX(200);
            } else {
                if (this.player.body.touching.down) {
                    this.player.setVelocityY(-350);
                }
            }
        });
        this.input.on('pointerup', () => {
            this.player.setVelocityX(0);
        });
        this.score = 0;
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
            fontFamily: 'Comic Sans MS',
            fontSize: '30px',
            fontStyle: 'bold',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3,
        });

        this.scale.on('resize', this.resize, this);
    }

    resize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;
        this.title.setPosition(width / 2, height * 0.1);
        this.title.setScale(width * 0.001);
        this.scoreText.setPosition(width * 0.05, height * 0.05);
        this.scoreText.setFontSize(`${Math.floor(width * 0.05)}px`);
    }

    update() {
        const speed = 200;
        this.player.setVelocityX(0);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
        }
        if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.player.body.touching.down) {
            this.player.setVelocityY(-350);
        }
        this.background.tilePositionX += 1;
        this.cheeses.getChildren().forEach((cheese) => {
            if (cheese.x < -50) {
                cheese.destroy();
            }
        });

        this.obstacles.getChildren().forEach((obstacle) => {
            if (obstacle.x < -50) {
                obstacle.destroy();
            }
        });
    }

    spawnCheese() {
        const x = 800;
        const y = Phaser.Math.Between(50, 200);
        const cheese = this.cheeses.create(x, y, 'cheese');
        cheese.setVelocityX(-300);
        cheese.setScale(0.1);
    }

    spawnObstacle() {
        const x = 800;
        const y = Phaser.Math.Between(50, 200); 
        const obstacle = this.obstacles.create(x, y, 'obstacle');
        obstacle.setVelocityX(-200);
        obstacle.setScale(0.1);
        const randomBounce = Phaser.Math.FloatBetween(0.5, 1.2);
        obstacle.setBounce(randomBounce);
        obstacle.setCollideWorldBounds(true);
        obstacle.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === obstacle) {
                const obstacleY = body.y;
                const obstacleX = body.x;

                if (obstacleX <= 0 || obstacleY <= 0) {
                    obstacle.destroy();
                    console.log('Obstáculo eliminado (lado izquierdo o superior)');
                }
            }
        });
    }

    collectCheese(player, cheese) {
        cheese.destroy();
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    hitObstacle(player, obstacle) {
        obstacle.destroy();
        this.score -= 20;
        if (this.score < 0) this.score = 0;
        this.scoreText.setText(`Score: ${this.score}`);
    }

}
