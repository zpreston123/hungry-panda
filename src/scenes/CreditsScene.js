import Phaser from 'phaser';
import config from '../config/game';

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
		this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

		Phaser.Display.Align.In.Center(
			this.creditsText,
			this.zone
		);

		Phaser.Display.Align.In.Center(
			this.madeByText,
			this.zone
		);

		this.madeByText.setY(1000);

		this.creditsTween = this.tweens.add({
			targets: this.creditsText,
			y: -100,
			ease: 'fade',
			duration: 3000,
			delay: 1000,
			onComplete: () => {
				this.destroy();
			}
		});

		this.madeByTween = this.tweens.add({
			targets: this.madeByText,
			y: -300,
			ease: 'Power1',
			duration: 8000,
			delay: 1000,
			onComplete: () => {
				this.madeByTween.destroy();
				this.scene.start('Title');
			}
		});
	}
}

export default CreditsScene;