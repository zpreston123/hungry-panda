import Phaser from 'phaser';

class Explosion extends Phaser.Physics.Arcade.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, 'explosion');
		this.setScale(2);
		config.scene.add.existing(this);
		this.play('explode');
	}
}

export default Explosion;
