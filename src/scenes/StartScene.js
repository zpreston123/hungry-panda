import Phaser from 'phaser';
import StartImage from '../assets/images/start.png';

export default class StartScene extends Phaser.Scene {
	constructor() {
		super('Start');
	}

	preload() {
		this.load.image('start', StartImage);
	}

	create() {
		this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'start');

		this.input.once('pointerdown', function (event) {
			this.scene.start('Level 01');
		}, this);
	}
}
