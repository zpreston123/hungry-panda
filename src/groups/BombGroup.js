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
                Phaser.Math.Between(100, config.y-230)
            );
            bomb.setScale(1.5);
            bomb.setCollideWorldBounds(true);
            if (config.bounce) {
                bomb.setVelocity(180, 120);
                bomb.setBounce(1);
            }
        });
    }
}

export default BombGroup;
