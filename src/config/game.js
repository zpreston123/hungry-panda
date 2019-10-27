export default {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	pixelArt: true,
	physics: {
		default: 'arcade'
	},
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};
