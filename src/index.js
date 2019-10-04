import Phaser from 'phaser';
import config from './config/config';
import StartScene from './scenes/StartScene';
import GameOverScene from './scenes/GameOverScene';
import LevelOneScene from './scenes/LevelOneScene';

class Game extends Phaser.Game {
	constructor() {
		super(config);
		this.scene.add('Start', StartScene);
		this.scene.add('Level 01', LevelOneScene);
		this.scene.add('End', GameOverScene);

		this.scene.start('Start');
	}
}

window.onload = function () {
	window.game = new Game();
};
