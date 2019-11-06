import Phaser from 'phaser';

class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'explosion');
        config.scene.add.existing(this);
        this.play('explode');
    }
}

export default Explosion;
