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
