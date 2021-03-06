import 'phaser';

class GameOverScene extends Phaser.Scene {
    constructor() {
        super('Game Over');
    }

    init({ levels, firstLevel }) {
        this.levels = levels;
        this.firstLevel = firstLevel;
    }

    create() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'game-over');
        this.restartText = this.add.text(this.cameras.main.width / 2, (this.cameras.main.height / 2) + 100, 'Restart', { fontSize: '32px', fill: '#fff' });
        this.restartText.setOrigin(0.5);
        this.sound.add('game-over-sound').play();
        this.input.on('pointerdown', () => {
            this.scene.start('Gameplay', { levels: this.levels, level: this.firstLevel });
        });
        this.input.keyboard.on('keydown', input => {
            if (input.key == 'Enter') {
                this.scene.start('Gameplay', { levels: this.levels, level: this.firstLevel });
            }
        });
    }
}

export default GameOverScene;
