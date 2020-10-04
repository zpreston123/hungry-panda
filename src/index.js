import 'phaser';
import { config } from './config';
import * as Scenes from './scenes';

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('Boot', Scenes.BootScene);
        this.scene.add('Preloader', Scenes.PreloaderScene);
        this.scene.add('Title', Scenes.TitleScene);
        this.scene.add('Credits', Scenes.CreditsScene);
        this.scene.add('Start', Scenes.StartScene);
        this.scene.add('Gameplay', Scenes.GameplayScene);
        this.scene.add('Clear', Scenes.ClearScene);
        this.scene.add('End', Scenes.GameOverScene);
        this.scene.start('Boot');
    }
}

const game = new Game(config);
