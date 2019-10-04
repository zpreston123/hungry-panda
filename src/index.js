import Phaser from 'phaser';
import config from './config/config';
import StartScene from './scenes/StartScene';
import GameOverScene from './scenes/GameOverScene';
import LevelOneScene from './scenes/LevelOneScene';

class Game extends Phaser.Game {
	constructor(config) {
		super(config);
		this.scene.add('Start', StartScene);
		this.scene.add('Level 01', LevelOneScene);
		this.scene.add('End', GameOverScene);

		this.scene.start('Start');
	}
}

window.onload = function () {
	// center and scale game for mobile devices
	if (screen.width < 600){
		config.scale = {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			parent: 'phaser-example',
			width: 500,
			height: 400
		};
	}

	window.game = new Game(config);
};
