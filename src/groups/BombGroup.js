import Phaser from 'phaser';

export default class BombGroup extends Phaser.Physics.Arcade.Group {
	constructor(config) {
		super(config.world, config.scene);
        this.createMultiple({
            key: 'icons',
            frame: 24,
            repeat: config.total
        });
        this.children.iterate(bomb => {
            bomb.setPosition(
                Phaser.Math.Between(20, config.x-20),
                Phaser.Math.Between(100, config.y-20)
            );
            bomb.setScale(3);
            bomb.setCollideWorldBounds(true);
        });
        config.scene.anims.create({
        	key: 'explode',
        	frames: config.scene.anims.generateFrameNumbers('explosion'),
        	frameRate: 20,
        	repeat: 0,
        	hideOnComplete: true
        });
    }
}
