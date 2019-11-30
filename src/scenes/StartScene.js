import 'phaser';
import levels from '../config/levels';

class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    init(data) {
        this.level = data.level || levels[0];
        this.levels = data.levels || levels;
    }

    create() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'start');
        this.input.on('pointerdown', () => {
            this.scene.start('Gameplay', { level: this.level, levels: this.levels });
        });
        this.input.keyboard.on('keydown', input => {
            if (input.key == 'Enter') {
                this.scene.start('Gameplay', { level: this.level, levels: this.levels });
            }
        });
    }
}

export default StartScene;
