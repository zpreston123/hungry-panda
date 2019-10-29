import Phaser from 'phaser';

class ScoreLabel extends Phaser.GameObjects.Text {
	constructor(config) {
		super(config.scene, config.x, config.y, config.text, config.style);
		this.score = 0;
		this.setLabel(this.score);
		config.scene.add.existing(this);
	}

	increaseScore() {
		this.score += 10;
		this.setLabel(this.score);
	}

	decreaseScore() {
		this.score -= 5;
		this.setLabel(this.score);
	}

	resetScore() {
		this.score = 0;
		this.setLabel(this.score);
	}

	setLabel(score) {
		this.setText(`Score: ${score}`);
	}
}

export default ScoreLabel;
