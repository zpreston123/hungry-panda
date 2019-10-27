import Phaser from 'phaser';
import config from '../config/config';
import fruitSound from '../assets/sounds/se2.wav';
import bombSound from '../assets/sounds/bomb1.wav';
import iconSpritesheet from '../assets/images/icon0.png';
import explosionSpritesheet from '../assets/images/explosion.png';
import Player from '../sprites/Player';
import FruitGroup from '../groups/FruitGroup';
import BombGroup from '../groups/BombGroup';

export default class GameplayScene extends Phaser.Scene {
	constructor() {
		super('Gameplay');
	}

	init(data) {
		this.level = data.level;
	}

	preload() {
		this.load.audio('fruit-sound', fruitSound);
		this.load.audio('bomb-sound', bombSound);
		this.load.spritesheet('icons', iconSpritesheet, { frameWidth: 16, frameHeight: 16 }, 71);
		this.load.spritesheet('explosion', explosionSpritesheet, { frameWidth: 16, frameHeight: 16 });
	}

	create() {
		// set background color
		this.cameras.main.setBackgroundColor(this.level.backgroundColor); // seagreen

		// add score
		this.score = 0;
		this.scoreLabel = this.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#fff' });

		// add time
		this.timer = 2000;
		this.timeLabel = this.add.text(16, 50, 'Time: ' + Math.round(this.timer / 100), { fontSize: '32px', fill: '#fff' });

        // add health
        this.currentHealth = 3;
        this.maxHealth = 3;
        this.healthLabel = this.add.text(610, 16, 'Health: ' + this.currentHealth, { fontSize: '32px', fill: '#fff'});

		// create player
		this.player = new Player({
			scene: this,
			x: config.width / 2,
			y: config.height / 2
		});

		// add keyboard input detection
		this.cursorKeys = this.input.keyboard.createCursorKeys();

		// make player draggable on mobile devices
		if (config.scale) {
			this.player.setInteractive();
			this.input.setDraggable(this.player);
			this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
				gameObject.x = dragX;
				gameObject.y = dragY;
			});
		}

		// create fruit group
		this.fruitGroup = new FruitGroup({
			world: this.physics.world,
			scene: this,
			x: config.width,
			y: config.height
		});

		// detect collision between the player and fruit
		this.physics.add.overlap(this.player, this.fruitGroup, (player, fruit) => {
			this.score += 10;
			this.sound.add('fruit-sound').play();
			this.scoreLabel.setText('Score: ' + this.score);
			fruit.destroy();
		}, null, this);

        // create bomb group
        this.bombGroup = new BombGroup({
        	world: this.physics.world,
        	scene: this,
        	x: config.width,
        	y: config.height,
        	total: this.level.totalBombs
        });

        // detect collision between the player and bomb
        this.physics.add.overlap(this.player, this.bombGroup, (player, bomb) => {
        	this.score -= 5;
        	this.currentHealth--;
        	this.healthLabel.setText('Health: ' + this.currentHealth);
        	this.scoreLabel.setText('Score: ' + this.score);
        	this.sound.add('bomb-sound').play();
        	this.explosion = this.physics.add.sprite(bomb.x, bomb.y, 'explosion');
        	bomb.destroy();
        	this.explosion.play('explode');
        }, null, this);
    }

    update() {
		// end game if no time or health remains
		if (this.timer == 0 || this.currentHealth == 0) {
			this.level.isGameOver = true;
		} else {
			this.timer--;
			this.timeLabel.setText('Time: ' + Math.round(this.timer / 100));
		}

		// reset score if it's negative
		if (this.score < 0) {
			this.score = 0;
			this.scoreLabel.setText('Score: ' + this.score);
		}

        // clear level if no fruit remain
        if (this.fruitGroup.getLength() == 0) {
        	this.level.isCleared = true;
        }

        // set velocity of player
        this.player.setVelocity(0);

		// move player based on keyboard input
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
