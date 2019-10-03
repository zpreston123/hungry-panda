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
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;

		this.add.image(width / 2, height / 2, 'start');

        this.input.once('pointerdown', function (event) {
            this.scene.start('Level 01');
        }, this);
	}
}
