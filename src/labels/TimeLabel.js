import Phaser from 'phaser';

export default class TimeLabel extends Phaser.GameObjects.Text {
	constructor(config) {
		super(config.scene, config.x, config.y, config.text, config.style);
        this.timer = 2000;
        this.setText(`Time: ${Math.round(this.timer / 100)}`);
        config.scene.add.existing(this);
	}

	decrementTime() {
		this.timer--;
		this.setText(`Time: ${Math.round(this.timer / 100)}`);
	}
}
