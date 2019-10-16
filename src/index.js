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

	create() {
		window.addEventListener('resize', resize);
		this.resize();
	}

	resize() {
		var canvas = game.canvas, width = document.getElementsByClassName("phaser-example")[0].offsetWidth, height = window.innerHeight;
		var wratio = width / height, ratio = canvas.width / canvas.height;

		if (wratio < ratio) {
			canvas.style.width = width + 'px';
			canvas.style.height = (width / ratio) + 'px';
		} else {
			canvas.style.width = (height * ratio) + 'px';
			canvas.style.height = height + 'px';
		}
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
