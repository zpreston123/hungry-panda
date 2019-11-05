import Phaser from 'phaser';
import config from '../config/game';
import { BombSound, FruitSound } from '../assets/sounds';
import { ExplosionSpritesheet, BombSprite, FruitAndVegSpritesheet, PlayerSpritesheet } from '../assets/images';
import { Explosion, Player } from '../sprites';
import { BombGroup, FruitGroup } from '../groups';
import { HealthLabel, ScoreLabel, TimeLabel } from '../labels';

class GameplayScene extends Phaser.Scene {
	constructor() {
		super('Gameplay');
	}

	init(data) {
		this.levels = data.levels;
		this.level = data.level;
	}

	preload() {
		this.load.audio('fruit-sound', FruitSound);
		this.load.audio('bomb-sound', BombSound);
		this.load.image('bomb', BombSprite);
		this.load.spritesheet('explosion', ExplosionSpritesheet, { frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('player', PlayerSpritesheet, { frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('fruitandveg', FruitAndVegSpritesheet, { frameWidth: 64, frameHeight: 64 });
	}

	create() {
		this.cameras.main.setBackgroundColor(this.level.backgroundColor);

		this.scoreLabel = new ScoreLabel({
			scene: this,
			x: 16,
			y: 16,
			text: 'Score:',
			style: { fontSize: '32px', fill: '#fff' }
		});

		this.timeLabel = new TimeLabel({
			scene: this,
			x: 16,
			y: 50,
			text: 'Time:',
			style: { fontSize: '32px', fill: '#fff' }
		});

		this.healthLabel = new HealthLabel({
			scene: this,
			x: 610,
			y: 16,
			text: 'Health:',
			style: { fontSize: '32px', fill: '#fff'}
		});

		this.player = new Player(this, config.width / 2, config.height / 2, 'player');

		this.fruitGroup = new FruitGroup({
			world: this.physics.world,
			scene: this,
			x: config.width,
			y: config.height,
			bounce: this.level.bounceFruit
		});

		this.bombGroup = new BombGroup({
			world: this.physics.world,
			scene: this,
			x: config.width,
			y: config.height,
			total: this.level.totalBombs,
			bounce: this.level.bounceBombs
		});

		// detect collision between the player and fruit
		this.physics.add.collider(this.player, this.fruitGroup, (player, fruit) => {
			this.scoreLabel.increaseScore();
			this.sound.add('fruit-sound').play();
			fruit.destroy();
		}, null, this);

        // detect collision between the player and bomb
        this.physics.add.collider(this.player, this.bombGroup, (player, bomb) => {
        	this.healthLabel.decrementHealth();
        	this.scoreLabel.decreaseScore();
        	this.sound.add('bomb-sound').play();
        	let explosion = new Explosion({ scene: this, x: bomb.x, y: bomb.y });
        	bomb.destroy();
        }, null, this);

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
    }

    update() {
    	if (this.timeLabel.timer == 0 || this.healthLabel.currentHealth == 0) {
    		this.scene.start('Game Over', { levels: this.levels, firstLevel: this.levels[0] });
    	} else {
    		this.timeLabel.decrementTime();
    	}

    	if (this.scoreLabel.score < 0) {
    		this.scoreLabel.resetScore();
    	}

    	if (this.fruitGroup.getLength() == 0) {
    		let index = this.levels.indexOf(this.level) + 1;
    		this.scene.start('Clear', { score: this.scoreLabel.score, nextLevel: this.levels[index], levels: this.levels });
    	}

    	this.player.setVelocity(0);

    	if (this.cursorKeys.left.isDown) {
    		this.player.setVelocityX(-300);
		    this.player.anims.play('left_anim', true);
		    this.player.flipX = true;
    	} else if (this.cursorKeys.right.isDown) {
    		this.player.setVelocityX(300);
		    this.player.anims.play('right_anim', true);
		    this.player.flipX = false;
    	} else if (this.cursorKeys.up.isDown) {
    		this.player.setVelocityY(-300);
		    this.player.anims.play('up_anim', true);
    	} else if (this.cursorKeys.down.isDown) {
    		this.player.setVelocityY(300);
		    this.player.anims.play('down_anim', true);
    	} else {
	        this.player.anims.stop();
	    }
    }
}

export default GameplayScene;
