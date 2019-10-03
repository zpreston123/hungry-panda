import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super('End');
	}

	preload() {
		this.load.image('game-over', '../assets/images/end.png');
	}
}
