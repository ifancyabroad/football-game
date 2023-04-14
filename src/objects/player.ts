import {Game} from "../scenes";

enum PlayerState {
	Idle,
	Active,
}

export class Player extends Phaser.Physics.Arcade.Sprite {
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	private spacebar: Phaser.Input.Keyboard.Key;

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

		this.cursors = scene.input.keyboard.createCursorKeys();
		this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	}

	private trackPlayer = (pointer: Phaser.Input.Pointer) => {
		this.x = pointer.x;
	};

	private takeShot = () => {
		if (this.state === PlayerState.Active) {
			return;
		}

		this.setState(PlayerState.Active);

		const scene = this.scene as Game;

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

	update() {
		this.setVelocity(0);

		if (this.cursors.left.isDown) {
			this.setVelocityX(-300);
		} else if (this.cursors.right.isDown) {
			this.setVelocityX(300);
		}

		if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
			this.takeShot();
		}
	}
}
