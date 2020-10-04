import 'phaser';

const formatTime = (time) => `Time: ${time}`;

class TimeLabel extends Phaser.GameObjects.Text {
	constructor(scene, x, y, time, style) {
		super(scene, x, y, formatTime(time), style);
	}
}

export default TimeLabel;
