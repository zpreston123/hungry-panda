import 'phaser';

const formatScore = (score) => `Score: ${score}`;

class ScoreLabel extends Phaser.GameObjects.Text {
    constructor(scene, x, y, score, style) {
        super(scene, x, y, formatScore(score), style);
        this.score = score;
    }

    setScore(score) {
        this.score = score;
        this.setText(formatScore(this.score));
    }

    add(points) {
        this.setScore(this.score + points);
    }

    subtract(points) {
        this.setScore(this.score - points);
    }

    reset() {
        this.setScore(0);
    }
}

export default ScoreLabel;
