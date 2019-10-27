import Phaser from 'phaser';

export default class FruitGroup extends Phaser.Physics.Arcade.Group {
	constructor(config) {
		super(config.world, config.scene);
		this.createMultiple({
			key: 'icons',
			frame: [15, 16, 17, 18, 27, 28, 29, 32],
			randomFrame: true
		});
		this.children.iterate(fruit => {
			fruit.setPosition(
				Phaser.Math.Between(20, config.x-20),
				Phaser.Math.Between(100, config.y-20)
			);
			fruit.setScale(1.5);
			fruit.setCollideWorldBounds(true);
		});
	}
}
