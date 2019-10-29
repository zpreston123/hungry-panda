import Phaser from 'phaser';

class ScoreLabel extends Phaser.GameObjects.Text {
	constructor(config) {
		super(config.scene, config.x, config.y, config.text, config.style);
        this.score = 0;
    	this.setText(`Score: ${this.score}`);
        config.scene.add.existing(this);
	}

	increaseScore() {
		this.score += 10;
		this.setText(`Score: ${this.score}`);
	}

	decreaseScore() {
    	this.score -= 5;
    	this.setText(`Score: ${this.score}`);
	}

	resetScore() {
		this.score = 0;
		this.setText(`Score: ${this.score}`);
	}
}

export default ScoreLabel;
