export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    this.score = 0;
    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: '32px',
      fill: '#ffcc00',
      fontFamily: 'Arial',
    });

    this.events.on('updateScore', (points) => {
      this.score += points;
      this.scoreText.setText(`Score: ${this.score}`);
    });
  }
}
