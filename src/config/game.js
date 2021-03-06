export default {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    physics: {
        default: 'arcade'
    },
    scale: {
        mode: Phaser.Scale.FIT
    }
};
