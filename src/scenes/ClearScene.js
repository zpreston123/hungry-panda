import Phaser from 'phaser';
import clearImage from '../assets/images/clear.png';
import clearSound from '../assets/sounds/se6.wav';

export default class ClearScene extends Phaser.Scene {
	constructor() {
		super('Clear');
	}

	init(data) {
		this.score = data.score;
	}

	preload() {
		this.load.image('clear-image', clearImage);
		this.load.audio('clear-sound', clearSound);
	}

	create() {
		this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'clear-image');
		this.scoreText = this.add.text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 70, `SCORE: ${this.score}`, { fontSize: '32px', fill: '#fff' });
		this.scoreText.setOrigin(0.5);
		this.sound.add('clear-sound').play();
	}
}
