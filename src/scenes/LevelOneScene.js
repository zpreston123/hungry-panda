import Phaser from 'phaser';

export default class Level01 extends Phaser.Scene {
	constructor() {
		super('Level 01');
	}

	create() {
		this.cameras.main.setBackgroundColor('#2E8B57'); // seagreen
	}
}
