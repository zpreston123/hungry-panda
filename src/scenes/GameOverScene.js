import Phaser from 'phaser';
import GameOverImage from '../assets/images/end.png';
import GameOverSound from '../assets/sounds/se7.wav';

class GameOverScene extends Phaser.Scene {
	constructor() {
		super('Game Over');
	}

	init(data) {
		this.levels = data.levels;
		this.firstLevel = data.firstLevel;
	}

	preload() {
		this.load.image('game-over', GameOverImage);
		this.load.audio('game-over-sound', GameOverSound);
	}

	create() {
		this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'game-over');
		this.sound.add('game-over-sound').play();
		this.restartText = this.add.text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 100, 'Restart', { fontSize: '32px', fill: '#fff' });
		this.restartText.setOrigin(0.5);
		this.restartText.setInteractive();
		this.restartText.on('pointerdown', () => {
			console.log('clicked');
			this.scene.start('Gameplay', { levels: this.levels, level: this.firstLevel });
		});
	}
}

export default GameOverScene;
