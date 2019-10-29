import Phaser from 'phaser';

class TimeLabel extends Phaser.GameObjects.Text {
	constructor(config) {
		super(config.scene, config.x, config.y, config.text, config.style);
		this.timer = 2000;
		this.setLabel(this.timer);
		config.scene.add.existing(this);
	}

	decrementTime() {
		this.timer--;
		this.setLabel(this.timer);
	}

	setLabel(timer) {
		this.setText(`Time: ${Math.round(timer / 100)}`);
	}
}

export default TimeLabel;
