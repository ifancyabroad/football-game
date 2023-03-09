import Demo from "../game";
import {Player} from "./player";

export class Ball extends Phaser.Physics.Arcade.Image {
	private floorCollider: Phaser.Physics.Arcade.Collider;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string | Phaser.Textures.Texture,
		frame?: string | number
	) {
		super(scene, x, y, texture, frame);

		scene.add.existing(this).setVisible(false);

		scene.physics.add.existing(this);
	}

	public launch = () => {
		this.scene.physics.world.removeCollider(this.floorCollider);

		const position = Phaser.Math.Between(200, 400);
		const velocityX = Phaser.Math.Between(250, 350);
		const velocityY = Phaser.Math.Between(0, -50);
		const angularVelocity = Phaser.Math.Between(10, 100);
		this.setTexture("ball")
			.setAlpha(1)
			.setOffset(0)
			.setCircle(32)
			.setBounce(0.5)
			.setVisible(true)
			.setScale(1)
			.setGravityY(150)
			.setPosition(0, position)
			.setVelocity(velocityX, velocityY)
			.setAngularVelocity(angularVelocity);
	};

	public shoot = (object1: Phaser.GameObjects.GameObject) => {
		const player = object1 as Player;

		this.scene.sound.play("kick");

		const velocityX = (this.x - player.x) * 10;
		const velocityY = (this.y - player.y) * 20;

		this.setGravityY(0).setVelocity(velocityX, velocityY).setAngularVelocity(0);

		this.scene.add.tween({
			targets: this,
			scale: 0.5,
			duration: 600,
			onComplete: this.scoreCheck,
		});
	};

	public saved = () => {
		const scene = this.scene as Demo;
		this.scene.sound.play("save");
		const velocityX = (this.x - scene.goalkeeper.x) * 5;
		const velocityY = this.y - scene.goalkeeper.y < 0 ? (this.y - scene.goalkeeper.y) * 5 : 0;
		const angularVelocity =
			velocityX > 0 ? Phaser.Math.Between(40, 80) : Phaser.Math.Between(-40, -80);

		this.setGravityY(150).setVelocity(velocityX, velocityY).setAngularVelocity(angularVelocity);

		this.floorCollider = scene.physics.add.collider(this, scene.floor2);
	};

	public goal = () => {
		const scene = this.scene as Demo;
		this.scene.sound.play("goal");
		scene.score++;
		scene.scoreCounter.updateScore(scene.score);
		this.body.stop();
		this.setTexture("goal_text").setScale(0.5).setRotation(0).setOffset(80, 0);

		this.scene.add.tween({
			targets: this,
			scale: 1,
			alpha: 0,
			duration: 600,
			callbackScope: this,
			onComplete: () => {
				this.setVisible(false);
			},
		});
	};

	public scoreCheck = () => {
		const scene = this.scene as Demo;

		if (this.scene.physics.overlap(this, scene.goalkeeper.sprite)) {
			this.saved();
			return;
		}

		if (this.scene.physics.overlap(this, scene.goalkeeper.leftHand)) {
			this.saved();
			return;
		}

		if (this.scene.physics.overlap(this, scene.goalkeeper.rightHand)) {
			this.saved();
			return;
		}

		if (this.scene.physics.overlap(this, scene.goal)) {
			this.goal();
		}
	};
}
