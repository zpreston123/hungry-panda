import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, 'icons', 21);
		this.setScale(3);
		this.speed = 4;
		config.scene.add.existing(this);
		config.scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
	}
}

export default Player;
