import Demo from "../game";

export class Player extends Phaser.GameObjects.Ellipse {
	constructor(
		scene: Demo,
		x?: number,
		y?: number,
		width?: number,
		height?: number,
		fillColor?: number,
		fillAlpha?: number
	) {
		super(scene, x, y, width, height, fillColor, fillAlpha);

		scene.add.existing(this);

		scene.physics.add.existing(this);

		scene.input.on(
			"pointermove",
			function (pointer: Phaser.Input.Pointer) {
				this.x = pointer.x;
			},
			this
		);

		scene.input.on(
			"pointerup",
			function (pointer: Phaser.Input.Pointer) {
				scene.physics.overlap(this, scene.ball, scene.ball.shoot);
			},
			this
		);
	}
}
