import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../config/game';

class TitleScene extends Phaser.Scene {
	constructor() {
		super('Title');
	}

	create() {
		// Background
		this.background = this.add.image(config.width / 2, config.height / 2, 'background');
		let scaleX = config.width / this.background.width;
		let scaleY = config.height / this.background.height;
		let scale = Math.max(scaleX, scaleY);
		this.background.setScale(scale).setScrollFactor(0);

		// Title
		this.add.image(config.width / 2, config.height / 2 - 180, 'title');

		// Game
		this.gameButton = new Button(this, config.width / 2, config.height / 2 - 30, 'blueButton1', 'blueButton2', 'Play', 'Start');

		// Credits
		this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 80, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
	}
}

export default TitleScene;
