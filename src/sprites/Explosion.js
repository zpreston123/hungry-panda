import Phaser from 'phaser';

class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'explosion');
        config.scene.anims.create({
            key: 'explode',
            frames: config.scene.anims.generateFrameNumbers('explosion'),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        config.scene.add.existing(this);
        this.play('explode');
    }
}

export default Explosion;
