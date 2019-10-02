import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super('Game Over');
	}

	preload() {
		this.load.image('game-over', 'assets/end.png');
	}
}
