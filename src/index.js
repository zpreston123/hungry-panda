import Phaser from 'phaser';
import config from './config/config';
import BootScene from './scenes/BootScene';
import GameOverScene from './scenes/GameOverScene';
import PreloaderScene from './scenes/PreloaderScene';
import LevelOneScene from './scenes/LevelOneScene';

class Game extends Phaser.Game {
	constructor() {
		super(config);
		this.scene.add('Boot', BootScene);
		this.scene.add('Preloader', PreloaderScene);
		this.scene.add('Level 01', LevelOneScene);
		this.scene.add('Game Over', GameOverScene);

		this.scene.start('Boot');
	}
}

window.onload = function () {
	window.game = new Game();
};
