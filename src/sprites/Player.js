import 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setScale(3);
        scene.anims.create({
            key: 'left_anim',
            frames: scene.anims.generateFrameNumbers(texture, { start: 15, end: 17 }),
            flipX: true,
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'right_anim',
            frames: scene.anims.generateFrameNumbers(texture, { start: 15, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'up_anim',
            frames: scene.anims.generateFrameNumbers(texture, { start: 10, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'down_anim',
            frames: scene.anims.generateFrameNumbers(texture, { start: 5, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
    }
}

export default Player;
