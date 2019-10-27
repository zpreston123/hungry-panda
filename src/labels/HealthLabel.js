import Phaser from 'phaser';

export default class HealthLabel extends Phaser.GameObjects.Text {
	constructor(config) {
		super(config.scene, config.x, config.y, config.text, config.style);
        this.currentHealth = 3;
        this.setText(`Health: ${this.currentHealth}`);
        config.scene.add.existing(this);
	}

	decrementHealth() {
		this.currentHealth--;
		this.setText(`Health: ${this.currentHealth}`);
	}
}
