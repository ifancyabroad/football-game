import Demo from "../game";

enum PlayerState {
	Idle,
	Active,
}

export class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string | Phaser.Textures.Texture,
		frame?: string | number
	) {
		super(scene, x, y, texture, frame);

		this.setState(PlayerState.Idle);

		scene.add.existing(this);

		scene.physics.add.existing(this).setCircle(40).setOffset(-40, 20);

		scene.input.on("pointermove", this.trackPlayer, this);

		scene.input.on("pointerup", this.takeShot, this);
	}

	private trackPlayer = (pointer: Phaser.Input.Pointer) => {
		this.x = pointer.x;
	};

	private takeShot = () => {
		if (this.state === PlayerState.Active) {
			return;
		}

		this.setState(PlayerState.Active);

		const scene = this.scene as Demo;

		scene.physics.overlap(this, scene.ball, scene.ball.shoot);

		this.scene.add.tween({
			targets: this,
			scale: 0.8,
			angle: 45,
			x: this.x - 20,
			y: this.y - 20,
			duration: 140,
			yoyo: true,
			onComplete: () => {
				this.setState(PlayerState.Idle);
			},
		});
	};
}
