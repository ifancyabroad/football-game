export class Floor extends Phaser.GameObjects.Line {
	constructor(
		scene: Phaser.Scene,
		x?: number,
		y?: number,
		x1?: number,
		y1?: number,
		x2?: number,
		y2?: number,
		strokeColor?: number,
		strokeAlpha?: number
	) {
		super(scene, x, y, x1, y1, x2, y2, strokeColor, strokeAlpha);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		if ("setImmovable" in this.body) {
			this.body.setImmovable(true);
		}
	}
}
