import Phaser from 'phaser';
import { config, levels } from './config';
import { StartScene, GameplayScene, ClearScene, GameOverScene } from './scenes';

class Game extends Phaser.Game {
	constructor(config) {
		super(config);
		this.scene.add('Start', StartScene);
		this.scene.add('Gameplay', GameplayScene);
		this.scene.add('Clear', ClearScene);
		this.scene.add('End', GameOverScene);
		this.scene.start('Start', { levels, levels, level: levels[0] });
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

window.onload = () => {
	// center and scale game for mobile devices
	if (screen.width < 600) {
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
