import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../config/game';
import levels from '../config/levels';

class TitleScene extends Phaser.Scene {
	constructor() {
		super('Title');
	}

	create() {
		// Background
		let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
		let scaleX = this.cameras.main.width / image.width;
		let scaleY = this.cameras.main.height / image.height;
		let scale = Math.max(scaleX, scaleY);
		image.setScale(scale).setScrollFactor(0);

		// Title
		let title = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2 - 180, 'title');

		// Game
		this.gameButton = new Button(this, config.width/2, config.height/2 - 80, 'blueButton1', 'blueButton2', 'Play', 'Start');

		// Options
		this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');

		// Credits
		this.creditsButton = new Button(this, config.width/2, config.height/2 + 80, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

		this.model = this.sys.game.globals.model;
		if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
			this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
			this.bgMusic.play();
			this.model.bgMusicPlaying = true;
			this.sys.game.globals.bgMusic = this.bgMusic;
		}
	}
}

export default TitleScene;
