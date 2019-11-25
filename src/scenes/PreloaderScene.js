import Phaser from 'phaser';
import config from '../config/game';
import {
	Title, JungleBackground, Logo, Checkbox, Checkedbox, Button01, Button02,
	ExplosionSpritesheet, BombSprite, FruitAndVegSpritesheet, PlayerSpritesheet,
	ClearImage, StartImage, GameOverImage
} from '../assets/images';
import { BackgroundMusic, BombSound, FruitSound, ClearSound, GameOverSound } from '../assets/audio';
import { Explosion, Player } from '../sprites';
import VirtualJoyStickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';

class PreloaderScene extends Phaser.Scene {
	constructor() {
		super('Preloader');
	}

	init() {
		this.readyCount = 0;
	}

	ready() {
		this.scene.start('Title');
		this.readyCount++;
		if (this.readyCount === 2) {
			this.scene.start('Title');
		}
	}

	preload() {
	    // add logo image
	    this.add.image(config.width / 2, config.height / 2, 'logo');

		// display progress bar
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect((config.width / 4), 270, 320, 50);

		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		var loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 100,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);

		// update progress bar
		this.load.on('progress', value => {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(310, 280, 300 * value, 30);
		});

		// update file progress text
		this.load.on('fileprogress', file => {
			assetText.setText('Loading asset: ' + file.key);
		});

		// remove progress bar when complete
		this.load.on('complete', () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			this.ready();
		});

		this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

		// load assets needed in our game
		this.load.audio('bgMusic', BackgroundMusic);
        this.load.audio('bomb-sound', BombSound);
        this.load.audio('clear-sound', ClearSound);
		this.load.audio('fruit-sound', FruitSound);
        this.load.audio('game-over-sound', GameOverSound);
		this.load.image('background', JungleBackground);
		this.load.image('blueButton1', Button01);
		this.load.image('blueButton2', Button02);
        this.load.image('bomb', BombSprite);
		this.load.image('box', Checkbox);
		this.load.image('checkedBox', Checkedbox);
		this.load.image('clear-image', ClearImage);
        this.load.image('game-over', GameOverImage);
        this.load.image('start', StartImage);
        this.load.image('title', Title);
        this.load.plugin('virtualjoystick-plugin', VirtualJoyStickPlugin, true);
        this.load.spritesheet('explosion', ExplosionSpritesheet, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('fruitandveg', FruitAndVegSpritesheet, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player', PlayerSpritesheet, { frameWidth: 32, frameHeight: 32});
	}
}

export default PreloaderScene;
