import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../config/game';
import levels from '../config/levels';

class TitleScene extends Phaser.Scene {
	constructor() {
		super('Title');
	}

	create() {
		// Background
		let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
		let scaleX = this.cameras.main.width / image.width;
		let scaleY = this.cameras.main.height / image.height;
		let scale = Math.max(scaleX, scaleY);
		image.setScale(scale).setScrollFactor(0);

		// Title
		let title = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2 - 180, 'title');

		// Game
		this.gameButton = new Button(this, config.width/2, config.height/2 - 80, 'blueButton1', 'blueButton2', 'Play', 'Start');

		// Credits
		this.creditsButton = new Button(this, config.width/2, config.height/2 + 80, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
	}
}

export default TitleScene;
