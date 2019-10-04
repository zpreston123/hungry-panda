import Phaser from 'phaser';
import config from '../config/config';
import fruitSound from '../assets/sounds/se2.wav';
import bombSound from '../assets/sounds/bomb1.wav';
import clearSound from '../assets/sounds/se6.wav';
import gameOverSound from '../assets/sounds/se7.wav';
import iconSpritesheet from '../assets/images/icon0.png';

export default class Level01 extends Phaser.Scene {
	constructor() {
		super('Level 01');
	}

	preload() {
		this.load.audio('fruit-sound', fruitSound);
		this.load.audio('bomb-sound', bombSound);
		this.load.audio('clear-sound', clearSound);
		this.load.audio('game-over-sound', gameOverSound);
		this.load.spritesheet('icons', iconSpritesheet, { frameWidth: 16, frameHeight: 16 }, 71);
	}

	create() {
		this.cameras.main.setBackgroundColor('#2E8B57'); // seagreen

		this.player = this.physics.add.sprite(config.width / 2, config.height / 2, 'icons', 21);
		this.player.setScale(2);
		this.player.speed = 4;
		this.player.setCollideWorldBounds(true);

		this.cursorKeys = this.input.keyboard.createCursorKeys();

		// make player draggable on mobile devices
		if (config.scale) {
			this.player.setInteractive();
			this.input.setDraggable(this.player);
			this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
				gameObject.x = dragX;
				gameObject.y = dragY;
			});
		}
	}

	update() {
		this.player.setVelocity(0);

		if (this.cursorKeys.left.isDown)
		{
			this.player.setVelocityX(-300);
		}
		else if (this.cursorKeys.right.isDown)
		{
			this.player.setVelocityX(300);
		}

		if (this.cursorKeys.up.isDown)
		{
			this.player.setVelocityY(-300);
		}
		else if (this.cursorKeys.down.isDown)
		{
			this.player.setVelocityY(300);
		}
	}
}
