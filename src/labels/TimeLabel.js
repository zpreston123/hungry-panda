import 'phaser';

class TimeLabel extends Phaser.GameObjects.Text {
	constructor(config) {
		super(config.scene, config.x, config.y, config.text, config.style);
		config.scene.add.existing(this);
	}
}

export default TimeLabel;
