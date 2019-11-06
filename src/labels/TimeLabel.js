import Phaser from 'phaser';

class TimeLabel extends Phaser.GameObjects.Text {
    constructor(config) {
        super(config.scene, config.x, config.y, config.text, config.style);
        this.time = 2000;
        this.setLabel(this.time);
        config.scene.add.existing(this);
    }

    decrementTime() {
        this.time--;
        this.setLabel(this.time);
    }

    setLabel(time) {
        this.setText(`Time: ${Math.round(time / 100)}`);
    }
}

export default TimeLabel;
