import Phaser from 'phaser';
import { config, levels } from './config';
import { BootScene, PreloaderScene, TitleScene, CreditsScene, ClearScene, GameOverScene, GameplayScene, StartScene } from './scenes';

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('Boot', BootScene);
        this.scene.add('Preloader', PreloaderScene);
        this.scene.add('Title', TitleScene);
        this.scene.add('Credits', CreditsScene);
        this.scene.add('Start', StartScene);
        this.scene.add('Gameplay', GameplayScene);
        this.scene.add('Clear', ClearScene);
        this.scene.add('End', GameOverScene);
        this.scene.start('Boot');
    }
}

const game = new Game(config);
