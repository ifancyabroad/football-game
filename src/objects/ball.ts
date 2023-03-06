import Demo from "../game";
import {Player} from "./player";

export class Ball extends Phaser.Physics.Arcade.Image {
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string | Phaser.Textures.Texture,
		frame?: string | number
	) {
		super(scene, x, y, texture, frame);

		scene.add.existing(this);

		scene.physics.add
			.existing(this)
			.setCircle(32)
			.setBounce(0.5)
			.setGravityY(150)
			.setVelocity(300, -50)
			.setAngularVelocity(50);
	}

	public reset = () => {
		const position = Phaser.Math.Between(200, 400);
		const velocityX = Phaser.Math.Between(250, 350);
		const velocityY = Phaser.Math.Between(0, -50);
		const angularVelocity = Phaser.Math.Between(10, 100);
		this.setScale(1)
			.setGravityY(150)
			.setPosition(0, position)
			.setVelocity(velocityX, velocityY)
			.setAngularVelocity(angularVelocity);
	};

	public shoot = (object1: Phaser.GameObjects.GameObject) => {
		const player = object1 as Player;
		const scene = this.scene as Demo;

		const tween = this.scene.add.tween({
			targets: this,
			scale: 0.5,
			duration: 1000,
		});

		const velocityX = (this.x - player.x) * 10;
		const velocityY = (this.y - player.y) * 10;

		this.setGravityY(0).setVelocity(velocityX, velocityY).setAngularVelocity(0);

		this.scene.time.delayedCall(
			600,
			() => {
				this.scene.physics.overlap(
					this,
					scene.goal,
					(object1: Phaser.GameObjects.GameObject) => {
						tween.stop();
						this.setVelocity(0, 0);
					}
				);
			},
			null,
			this
		);
	};
}
