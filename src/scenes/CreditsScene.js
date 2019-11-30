import 'phaser';
import config from '../config/game';
import Button from '../Objects/Button';

class CreditsScene extends Phaser.Scene {
	constructor() {
		super('Credits');
	}

	create() {
		this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
		this.madeByText = this.add.text(0, 0, 'Created By: Zach Preston', { fontSize: '26px', fill: '#fff' });
		this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
		this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

		Phaser.Display.Align.In.Center(
			this.creditsText,
			this.zone,
			0,
			-30
		);

		Phaser.Display.Align.In.Center(
			this.madeByText,
			this.zone,
			0,
			35
		);

		Phaser.Display.Align.In.Center(
			this.menuButton,
			this.zone,
			0,
			110
		);
	}
}

export default CreditsScene;
