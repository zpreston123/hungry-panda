import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
	constructor() {
		super('Start');
	}

	preload() {
		this.load.image('start', 'assets/start.png');
	}

	create() {
        this.add.sprite(this.sys.game.width / 2, this.sys.game.height / 2, 'start');

        this.input.once('pointerdown', function (event) {
            this.scene.start('Level 01');
        }, this);
	}
}
