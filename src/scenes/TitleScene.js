import 'phaser';
import Button from '../Objects/Button';
import config from '../config/game';

class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    create() {
        // Title
        this.add.image(config.width / 2, config.height / 2 - 180, 'title');

        // Game
        this.gameButton = new Button(this, config.width / 2, config.height / 2 - 30, 'blueButton1', 'blueButton2', 'Play', 'Start');

        // Credits
        this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 80, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
    }
}

export default TitleScene;
