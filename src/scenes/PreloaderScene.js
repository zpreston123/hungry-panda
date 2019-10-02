import Phaser from 'phaser';
import fruitSound from './assets/se2.wav';
import bombSound from './assets/bomb1.wav';
import clearSound from './assets/se6.wav';
import gameOverSound from './assets/se7.wav';
import iconSpritesheet from './assets/icon0.png';

export default class PreloaderScene extends Phaser.Scene {
	constructor() {
		super('Preloader');
	}

	preload() {
		this.load.audio('fruit-sound', fruitSound);
		this.load.audio('bomb-sound', bombSound);
		this.load.audio('clear-sound', clearSound);
		this.load.audio('game-over-sound', gameOverSound);
		this.load.spritesheet('icons', iconSpritesheet);
	}
}
