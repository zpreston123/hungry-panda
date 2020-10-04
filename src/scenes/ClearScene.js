import 'phaser';

class ClearScene extends Phaser.Scene {
    constructor() {
        super('Clear');
    }

    init({ score, highScore, levels, nextLevel }) {
        this.score = score;
        this.highScore = highScore;
        this.levels = levels;
        this.nextLevel = nextLevel;
    }

    create() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'clear-image');
        this.scoreText = this.add.text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 70, `SCORE: ${this.score}`, { fontSize: '32px', fill: '#fff' });
        this.highScoreText = this.add.text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 100, `HIGH SCORE: ${this.highScore}`, { fontSize: '32px', fill: '#fff' });
        this.scoreText.setOrigin(0.5);
        this.highScoreText.setOrigin(0.5);
        this.sound.add('clear-sound').play();

        if (this.nextLevel) {
            this.nextLevelText = this.add.text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 140, 'Go to the next level', { fontSize: '32px', fill: '#fff' });
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
            this.nextLevelText = this.add.text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 140, 'YOU COMPLETED THE GAME!', { fontSize: '32px', fill: '#fff' });
            this.nextLevelText.setOrigin(0.5);
        }
    }
}

export default ClearScene;
