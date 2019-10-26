import Phaser from 'phaser';
import StartImage from '../assets/images/start.png';

export default class StartScene extends Phaser.Scene {
	constructor() {
		super('Start');
	}

	init(data) {
		this.level = data.level;
	}

	preload() {
		this.load.image('start', StartImage);
	}

	create() {
		this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'start');

		this.input.once('pointerdown', function (event) {
			this.scene.start('Gameplay', { level: this.level });
		}, this);

		this.input.keyboard.on('keydown', (input) => {
			if (input.key == "Enter") {
				this.scene.start('Gameplay', { level: this.level });
			}
		});
	}
}
