import 'phaser';
import config from '../config/game';
import { BombGroup, FruitGroup } from '../groups';
import { HealthLabel, ScoreLabel, TimeLabel } from '../labels';
import { Explosion, Player } from '../sprites';

class GameplayScene extends Phaser.Scene {
    constructor() {
        super('Gameplay');
    }

    init({ levels, level }) {
        this.levels = levels;
        this.level = level;
    }

    create() {
        this.cameras.main.setBackgroundColor(this.level.backgroundColor);

        this.gameTime = 20;
        this.score = 0;
        this.health = this.level.lives;

        this.physics.world.setBounds(0, 130, config.width, config.height - 130);

        this.scoreLabel = new ScoreLabel(this, 0, 0, this.score, { fontSize: '32px', fill: '#fff' });
        this.timeLabel = new TimeLabel(this, 0, 0, this.gameTime, { fontSize: '32px', fill: '#fff' });
        this.healthLabel = new HealthLabel(this, 0, 0, this.health, { fontSize: '32px', fill: '#fff' });

        this.add.existing(this.scoreLabel);
        this.add.existing(this.timeLabel);
        this.add.existing(this.healthLabel);

        this.labelZone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

        Phaser.Display.Align.In.TopLeft(this.scoreLabel, this.labelZone);
        Phaser.Display.Align.In.TopLeft(this.timeLabel, this.labelZone, 0, -30);
        Phaser.Display.Align.In.TopRight(this.healthLabel, this.labelZone);

        this.timer = this.time.addEvent({ delay: 1000, callback: this.decreaseTime, callbackScope: this, loop: true });

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
            this.physics.add.collider(this.fruitGroup, this.fruitGroup);
            this.physics.add.collider(this.bombGroup, this.bombGroup);

            if (this.levels.indexOf(this.level) === 2) { // level 3
                this.physics.add.collider(this.fruitGroup, this.bombGroup);
            }
        }

        // detect collision between the player and fruit
        this.playerFruitCollider = this.physics.add.collider(this.player, this.fruitGroup, (player, fruit) => {
            this.scoreLabel.add(10);
            this.sound.add('fruit-sound').play();
            fruit.destroy();
        }, null, this);

        // detect collision between the player and bomb
        this.playerBombCollider = this.physics.add.collider(this.player, this.bombGroup, (player, bomb) => {
            this.healthLabel.subtract();
            this.scoreLabel.subtract(5);
            this.hurtPlayer();
            this.sound.add('bomb-sound').play();
            const explosion = new Explosion({ scene: this, x: bomb.x, y: bomb.y });
            bomb.destroy();
        }, null, this);

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
        if ((localStorage.getItem('highScore') === null) || (this.scoreLabel.score > localStorage.getItem('highScore'))) {
            localStorage.setItem('highScore', this.scoreLabel.score);
        }

        if (this.tweens.isTweening(this.player)) {
            this.playerFruitCollider.active = false;
            this.playerBombCollider.active = false;
        } else {
            this.playerFruitCollider.active = true;
            this.playerBombCollider.active = true;
        }

        if (this.gameTime === 0 || this.healthLabel.health === 0) {
            this.timer.remove();
            this.scene.start('Game Over', { levels: this.levels, firstLevel: this.levels[0] });
        }

        if (this.scoreLabel.score < 0) {
            this.scoreLabel.reset();
        }

        if (this.fruitGroup.getLength() === 0) {
            this.scene.start('Clear', { score: this.scoreLabel.score, highScore: localStorage.getItem('highScore'), nextLevel: this.levels[this.levels.indexOf(this.level) + 1], levels: this.levels });
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
        this.time.addEvent({
            delay: 250, callback: event => {
                this.player.clearTint();
            }, callbackScope: this
        });
    }
    decreaseTime() {
        this.gameTime--;
        this.timeLabel.text = `Time: ${this.gameTime}`;
    }
}

export default GameplayScene;
