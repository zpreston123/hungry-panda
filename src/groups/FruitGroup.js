import Phaser from 'phaser';

class FruitGroup extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.world, config.scene);
        this.createMultiple({
            key: 'fruitandveg',
            frame: [0, 1, 3, 8, 10, 11, 14, 25, 30, 34],
            randomFrame: true
        });
        this.children.iterate(fruit => {
            fruit.setPosition(
                Phaser.Math.Between(20, config.x-20),
                Phaser.Math.Between(100, config.y-20)
            );
            fruit.setCollideWorldBounds(true);
            if (config.bounce) {
                fruit.setVelocity(100, 100);
                fruit.setBounce(1);
            }
        });
    }
}

export default FruitGroup;
