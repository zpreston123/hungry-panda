import Phaser from 'phaser';
import config from '../config/config';
import iconSpritesheet from '../assets/images/icon0.png';

export default class Level01 extends Phaser.Scene {
	constructor() {
		super('Level 01');
	}

	preload() {
        this.load.spritesheet('icons', iconSpritesheet, { frameWidth: 16, frameHeight: 16 }, 71);
	}

	create() {
		this.cameras.main.setBackgroundColor('#2E8B57'); // seagreen

		this.player = this.physics.add.sprite(config.width / 2, config.height / 2, 'icons', 21);
		this.player.setScale(2);
        this.player.speed = 4;
		this.player.setCollideWorldBounds(true);

		this.cursorKeys = this.input.keyboard.createCursorKeys();
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
