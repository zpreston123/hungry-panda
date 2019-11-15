import Phaser from 'phaser';
import config from '../config/game';
import { BombSound, FruitSound } from '../assets/sounds';
import { ExplosionSpritesheet, BombSprite, FruitAndVegSpritesheet, PlayerSpritesheet } from '../assets/images';
import { Explosion, Player } from '../sprites';
import { BombGroup, FruitGroup } from '../groups';
import { HealthLabel, ScoreLabel, TimeLabel } from '../labels';
import VirtualJoyStickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';

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
        this.load.plugin('virtualjoystick-plugin', VirtualJoyStickPlugin, true);
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

        this.player = new Player(this, config.width / 2, config.height / 2, 'player');

        if (this.levels.indexOf(this.level) > 0) { // levels 2 and 3
            this.player.setAlpha(0);
            this.tweens.add({ targets: this.player, alpha: 1, duration: 3000 });
        }

        // detect collision between the player and fruit
        this.playerFruitCollider = this.physics.add.collider(this.player, this.fruitGroup, (player, fruit) => {
            this.scoreLabel.increaseScore();
            this.sound.add('fruit-sound').play();
            fruit.destroy();
        }, null, this);

        // detect collision between the player and bomb
        this.playerBombCollider = this.physics.add.collider(this.player, this.bombGroup, (player, bomb) => {
            this.healthLabel.decrementHealth();
            this.scoreLabel.decreaseScore();
            this.hurtPlayer();
            this.sound.add('bomb-sound').play();
            const explosion = new Explosion({ scene: this, x: bomb.x, y: bomb.y });
            bomb.destroy();
        }, null, this);

        this.highScore = localStorage.highScore;

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
            this.joyStick = this.plugins.get('virtualjoystick-plugin').add(this, {
                x: config.width - 200,
                y: config.height - 230,
                radius: 120,
                base: this.add.graphics().fillStyle(0x888888, 0.35).fillCircle(0, 0, 150),
                thumb: this.add.graphics().fillStyle(0xcccccc).fillCircle(0, 0, 80)
            });
        }
    }

    update() {
        if (this.scoreLabel.score > localStorage.highScore) {
            localStorage.highScore = this.scoreLabel.score;
        }

        if (this.tweens.isTweening(this.player)) {
            this.playerFruitCollider.active = false;
            this.playerBombCollider.active = false;
        } else {
            this.playerFruitCollider.active = true;
            this.playerBombCollider.active = true;
        }

        if (this.timeLabel.time == 0 || this.healthLabel.currentHealth == 0) {
            this.scene.start('Game Over', { levels: this.levels, firstLevel: this.levels[0] });
        } else {
            this.timeLabel.decrementTime();
        }

        if (this.scoreLabel.score < 0) {
            this.scoreLabel.resetScore();
        }

        if (this.fruitGroup.getLength() == 0) {
            this.scene.start('Clear', { score: this.scoreLabel.score, highScore: this.highScore, nextLevel: this.levels[this.levels.indexOf(this.level) + 1], levels: this.levels });
        }

        this.player.setVelocity(0);

        // check keyboard and joystick (mobile) input
        if (this.cursorKeys.left.isDown || (this.joyStick && this.joyStick.left)) {
            this.player.setVelocityX(-300);
            this.player.anims.play('left_anim', true);
            this.player.flipX = true;
        } else if (this.cursorKeys.right.isDown || (this.joyStick && this.joyStick.right)) {
            this.player.setVelocityX(300);
            this.player.anims.play('right_anim', true);
            this.player.flipX = false;
        } else if (this.cursorKeys.up.isDown || (this.joyStick && this.joyStick.up)) {
            this.player.setVelocityY(-300);
            this.player.anims.play('up_anim', true);
        } else if (this.cursorKeys.down.isDown || (this.joyStick && this.joyStick.down)) {
            this.player.setVelocityY(300);
            this.player.anims.play('down_anim', true);
        } else {
            this.player.anims.stop();
        }
    }

    hurtPlayer() {
        this.player.setTint(0xff0000);
        this.time.addEvent({ delay: 250, callback: event => {
            this.player.clearTint();
        }, callbackScope: this });
    }
}

export default GameplayScene;
