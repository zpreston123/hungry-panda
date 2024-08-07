import 'phaser';

const formatHealth = (health) => `Health: ${health}`;

class HealthLabel extends Phaser.GameObjects.Text {
    constructor(scene, x, y, health, style) {
        super(scene, x, y, formatHealth(health), style);
        this.health = health;
    }

    setHealth(health) {
        this.health = health;
        this.setText(formatHealth(this.health));
    }

    add(lives) {
        this.setHealth(this.health + lives);
    }

    subtract() {
        this.setHealth(this.health - 1);
    }
}

export default HealthLabel;
