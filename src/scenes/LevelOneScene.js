import Phaser from 'phaser';
import config from '../config/config';
import fruitSound from '../assets/sounds/se2.wav';
import bombSound from '../assets/sounds/bomb1.wav';
import iconSpritesheet from '../assets/images/icon0.png';

export default class Level01 extends Phaser.Scene {
	constructor() {
		super('Level 01');
	}

	preload() {
		this.load.audio('fruit-sound', fruitSound);
		this.load.audio('bomb-sound', bombSound);
		this.load.spritesheet('icons', iconSpritesheet, { frameWidth: 16, frameHeight: 16 }, 71);
	}

	create() {
		// set background color
		this.cameras.main.setBackgroundColor('#2E8B57'); // seagreen

        // add health
        this.currentHealth = 3;
        this.maxHealth = 3;
        this.healthLabel = this.add.text(610, 16, 'Health: ' + this.currentHealth, { fontSize: '32px', fill: '#fff'});

		// create player
		this.player = this.physics.add.sprite(config.width / 2, config.height / 2, 'icons', 21);
		this.player.setScale(2);
		this.player.speed = 4;
		this.player.setCollideWorldBounds(true);

		// create fruit group
		this.fruitGroup = this.physics.add.group();
		this.fruitGroup.createMultiple({
			key: 'icons',
			frame: [15, 16, 17, 18, 27, 28, 29, 32],
			randomFrame: true
		});
		this.fruitGroup.children.iterate(fruit => {
			fruit.setPosition(
				Phaser.Math.Between(20, config.width-20),
				Phaser.Math.Between(100, config.height-20)
			);
			fruit.setScale(1.5);
			fruit.setCollideWorldBounds(true);
		});

		// detect collision between the player and fruit
		this.physics.add.overlap(this.player, this.fruitGroup, function (player, fruit) {
			this.sound.add('fruit-sound').play();
			fruit.destroy();
		}, null, this);

        // add bomb group
        this.bombGroup = this.physics.add.group();
        this.bombGroup.createMultiple({
            key: 'icons',
            frame: 24,
            repeat: 5
        });
        this.bombGroup.children.iterate(bomb => {
            bomb.setPosition(
                Phaser.Math.Between(20, config.width-20),
                Phaser.Math.Between(100, config.height-20)
            );
            bomb.setScale(1.5);
            bomb.setCollideWorldBounds(true);
        });

        // detect collision between the player and bomb
        this.physics.add.overlap(this.player, this.bombGroup, function (player, bomb) {
            this.currentHealth--;
            this.sound.add('bomb-sound').play();
            bomb.destroy();
        }, null, this);

		// add keyboard input detection
		this.cursorKeys = this.input.keyboard.createCursorKeys();

		// make player draggable on mobile devices
		if (config.scale) {
			this.player.setInteractive();
			this.input.setDraggable(this.player);
			this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
				gameObject.x = dragX;
				gameObject.y = dragY;
			});
		}

		// add score
		this.score = 0;
		this.scoreLabel = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

		// add time
		this.initialTime = 20000;
		this.timeLabel = this.add.text(16, 50, 'Time: 20', { fontSize: '32px', fill: '#fff' });

        // add health
        this.currentHealth = 3;
        this.maxHealth = 3;
        this.healthLabel = this.add.text(610, 16, 'Health: 3', { fontSize: '32px', fill: '#fff'});

        this.clearSound = this.sound.add('clear-sound');
	}

	update() {
        if (this.currentHealth == 0) {
            this.scene.start('Game Over');
        }

        if (this.fruitGroup.getLength() == 0) {
        	this.scene.start('Clear');
        }

        this.healthLabel.setText('Health: ' + this.currentHealth);

		this.player.setVelocity(0);

		if (this.cursorKeys.left.isDown) {
			this.player.setVelocityX(-300);
		} else if (this.cursorKeys.right.isDown) {
			this.player.setVelocityX(300);
		} else if (this.cursorKeys.up.isDown) {
			this.player.setVelocityY(-300);
		} else if (this.cursorKeys.down.isDown) {
			this.player.setVelocityY(300);
		}
	}
}
