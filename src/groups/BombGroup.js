import Phaser from 'phaser';

class BombGroup extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.world, config.scene);
        this.createMultiple({
            key: 'bomb',
            repeat: config.total
        });
        this.children.iterate(bomb => {
            bomb.setPosition(
                Phaser.Math.Between(20, config.x-300),
                Phaser.Math.Between(100, config.y-100)
            );
            bomb.setScale(1.5);
            bomb.setCollideWorldBounds(true);
            if (config.bounce) {
                bomb.setVelocity(100, 100);
                bomb.setBounce(1);
            }
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

export default BombGroup;
