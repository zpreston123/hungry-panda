import Phaser from 'phaser';
import gameOverImage from '../assets/images/end.png';
import gameOverSound from '../assets/sounds/se7.wav';

export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super('Game Over');
	}

	preload() {
		this.load.image('game-over', gameOverImage);
		this.load.audio('game-over-sound', gameOverSound);
	}

	create() {
		this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'game-over');
        this.sound.add('game-over-sound').play();
	}
}
