import 'phaser';
import VirtualJoyStickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import * as Audio from '../assets/audio';
import * as Images from '../assets/images';
import config from '../config/game';

class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        // add logo image
        this.add.image(config.width / 2, config.height / 2, 'logo');

        // display progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(Phaser.Display.Color.GetColor(41, 108, 146), 0.5);
        progressBox.fillRect(config.width / 2 - 250, config.height / 2 - 30, 500, 50);

        var loadingText = this.make.text({
            x: config.width / 2,
            y: config.height / 2 - 90,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: config.width / 2,
            y: config.height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', value => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(Phaser.Display.Color.GetColor(175, 234, 220), 0.8);
            progressBar.fillRect(config.width / 2 - 245, config.height / 2 - 22, 490 * value, 35);
        });

        // remove progress bar when complete
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            this.scene.start('Title');
        });

        // load assets needed in the game
        this.load.audio('bomb-sound', Audio.BombSound);
        this.load.audio('clear-sound', Audio.ClearSound);
        this.load.audio('fruit-sound', Audio.FruitSound);
        this.load.audio('game-over-sound', Audio.GameOverSound);
        this.load.image('blueButton1', Images.Button01);
        this.load.image('blueButton2', Images.Button02);
        this.load.image('bomb', Images.BombSprite);
        this.load.image('box', Images.Checkbox);
        this.load.image('checkedBox', Images.Checkedbox);
        this.load.image('clear-image', Images.ClearImage);
        this.load.image('game-over', Images.GameOverImage);
        this.load.image('start', Images.StartImage);
        this.load.image('title', Images.Title);
        this.load.plugin('virtualjoystick-plugin', VirtualJoyStickPlugin, true);
        this.load.spritesheet('explosion', Images.ExplosionSpritesheet, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('fruitandveg', Images.FruitAndVegSpritesheet, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player', Images.PlayerSpritesheet, { frameWidth: 32, frameHeight: 32 });
    }
}

export default PreloaderScene;
