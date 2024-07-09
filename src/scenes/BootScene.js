import 'phaser';
import { Logo } from '../assets/images';

class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('logo', Logo);
    }

    create() {
        this.scene.start('Preloader');
    }
}

export default BootScene;
