import Phaser from 'phaser';
import ClearImage from '../assets/images/clear.png';
import ClearSound from '../assets/sounds/se6.wav';

class ClearScene extends Phaser.Scene {
    constructor() {
        super('Clear');
    }

    init(data) {
        this.score = data.score;
        this.levels = data.levels;
        this.nextLevel = data.nextLevel;
    }

    preload() {
        this.load.image('clear-image', ClearImage);
        this.load.audio('clear-sound', ClearSound);
    }

    create() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'clear-image');
        this.scoreText = this.add.text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 70, `SCORE: ${this.score}`, { fontSize: '32px', fill: '#fff' });
        this.scoreText.setOrigin(0.5);
        this.sound.add('clear-sound').play();

        if (this.nextLevel) {
            this.nextLevelText = this.add.text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 120, 'Go to the next level', { fontSize: '32px', fill: '#fff' });
            this.nextLevelText.setOrigin(0.5);
            this.input.on('pointerdown', () => {
                this.scene.start('Gameplay', { levels: this.levels, level: this.nextLevel });
            });
            this.input.keyboard.on('keydown', input => {
                if (input.key == 'Enter') {
                    this.scene.start('Gameplay', { levels: this.levels, level: this.nextLevel });
                }
            });
        } else {
            this.nextLevelText = this.add.text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 120, 'YOU COMPLETED THE GAME!', { fontSize: '32px', fill: '#fff' });
            this.nextLevelText.setOrigin(0.5);
        }
    }
}

export default ClearScene;
