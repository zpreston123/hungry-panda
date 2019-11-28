import Phaser from 'phaser';
import config from '../config/game';
import Button from '../Objects/Button';

class CreditsScene extends Phaser.Scene {
	constructor() {
		super('Credits');
	}

	create() {
		// Background
		let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
		let scaleX = this.cameras.main.width / image.width;
		let scaleY = this.cameras.main.height / image.height;
		let scale = Math.max(scaleX, scaleY);
		image.setScale(scale).setScrollFactor(0);

		this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
		this.madeByText = this.add.text(0, 0, 'Created By: Zach Preston', { fontSize: '26px', fill: '#fff' });
		this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');

		this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

		Phaser.Display.Align.In.Center(
			this.creditsText,
			this.zone
		);

		Phaser.Display.Align.In.Center(
			this.madeByText,
			this.zone
		);

		Phaser.Display.Align.In.Center(
			this.menuButton,
			this.zone
		);

		this.madeByText.setY(1100);
		this.menuButton.setY(1250);
	}
}

export default CreditsScene;
