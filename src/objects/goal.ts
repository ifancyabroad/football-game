export class Goal extends Phaser.GameObjects.Rectangle {
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		width?: number,
		height?: number,
		fillColor?: number,
		fillAlpha?: number
	) {
		super(scene, x, y, width, height, fillColor, fillAlpha);

		scene.add.existing(this);
		scene.physics.add.existing(this);
	}
}
