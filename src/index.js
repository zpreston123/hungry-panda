import Phaser from 'phaser';
import { config, levels } from './config';
import { ClearScene, GameOverScene, GameplayScene, StartScene } from './scenes';

class Game extends Phaser.Game {
	constructor(config) {
		super(config);
		this.scene.add('Start', StartScene);
		this.scene.add('Gameplay', GameplayScene);
		this.scene.add('Clear', ClearScene);
		this.scene.add('End', GameOverScene);
		this.scene.start('Start', { levels: levels, level: levels[0] });
	}
}

const game = new Game(config);
