import {Game} from "../scenes";
import {Player} from "./Player";

enum BallState {
	Idle,
	Active,
	OutOfBounds,
	Saved,
	Scored,
	Resetting,
}

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

		this.setState(BallState.Idle);

		scene.add.existing(this).setVisible(false);

		scene.physics.add.existing(this);
	}

	public launch = () => {
		this.setState(BallState.Active);

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
		const scene = this.scene as Game;

		this.scene.sound.play("kick");

		const velocityX = (this.x - player.x) * 10;
		const velocityY = (this.y - player.y) * 20;

		this.setGravityY(0).setVelocity(velocityX, velocityY).setAngularVelocity(0);

		this.scene.time.delayedCall(200, scene.goalkeeper.startTracking, null, this);

		this.scene.add.tween({
			targets: this,
			scale: 0.5,
			duration: 600,
			onComplete: this.scoreCheck,
		});
	};

	private saved = () => {
		const scene = this.scene as Game;
		this.scene.sound.play("save");
		const velocityX = (this.x - scene.goalkeeper.x) * 5;
		const velocityY = this.y - scene.goalkeeper.y < 0 ? (this.y - scene.goalkeeper.y) * 5 : 0;
		const angularVelocity =
			velocityX > 0 ? Phaser.Math.Between(40, 80) : Phaser.Math.Between(-40, -80);

		this.setGravityY(150).setVelocity(velocityX, velocityY).setAngularVelocity(angularVelocity);

		this.floorCollider = scene.physics.add.collider(this, scene.floor2);

		this.setState(BallState.Saved);
	};

	private post = (object: Phaser.GameObjects.Rectangle) => {
		const scene = this.scene as Game;
		this.scene.sound.play("post");
		const x = object.parentContainer.x + object.x;
		const y = object.parentContainer.y + object.y;
		const velocityX = (this.x - x) * 20;
		const velocityY = this.y - y;
		const angularVelocity =
			velocityX > 0 ? Phaser.Math.Between(40, 80) : Phaser.Math.Between(-40, -80);

		this.setGravityY(150).setVelocity(velocityX, velocityY).setAngularVelocity(angularVelocity);

		this.floorCollider = scene.physics.add.collider(this, scene.floor2);

		this.setState(BallState.Saved);
	};

	private crossbar = (object: Phaser.GameObjects.Rectangle) => {
		const scene = this.scene as Game;
		this.scene.sound.play("post");
		const x = object.parentContainer.x + object.x;
		const y = object.parentContainer.y + object.y;
		const velocityX = this.x - x;
		const velocityY = (this.y - y) * 20;
		const angularVelocity =
			velocityX > 0 ? Phaser.Math.Between(40, 80) : Phaser.Math.Between(-40, -80);

		this.setGravityY(150).setVelocity(velocityX, velocityY).setAngularVelocity(angularVelocity);

		this.floorCollider = scene.physics.add.collider(this, scene.floor2);

		this.setState(BallState.Saved);
	};

	private goal = () => {
		const scene = this.scene as Game;
		this.scene.sound.play("goal");
		scene.score++;
		scene.scoreCounter.updateScore(scene.score);
		this.body.stop();
		this.setTexture("goal_text").setScale(0.5).setRotation(0).setOffset(80, 0);

		this.setState(BallState.Scored);

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

	private scoreCheck = () => {
		const scene = this.scene as Game;

		scene.goalkeeper.stopTracking();

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

		if (this.scene.physics.overlap(this, scene.goal.leftPost)) {
			this.post(scene.goal.leftPost);
			return;
		}

		if (this.scene.physics.overlap(this, scene.goal.rightPost)) {
			this.post(scene.goal.rightPost);
			return;
		}

		if (this.scene.physics.overlap(this, scene.goal.crossbar)) {
			this.crossbar(scene.goal.crossbar);
			return;
		}

		if (this.scene.physics.overlap(this, scene.goal.goal)) {
			this.goal();
		}
	};

	private inViewCheck = () => {
		const worldEmpty = this.scene.cameras.main.worldView.isEmpty();
		const inView = Phaser.Geom.Rectangle.Overlaps(
			this.getBounds(),
			this.scene.cameras.main.worldView
		);
		if (!worldEmpty && !inView) {
			this.setState(BallState.OutOfBounds);
		}
	};

	private reset = () => {
		this.setState(BallState.Resetting);
		this.scene.time.delayedCall(
			1000,
			() => {
				this.launch();
			},
			null,
			this
		);
	};

	update() {
		switch (this.state) {
			case BallState.OutOfBounds:
				this.reset();
				break;
			case BallState.Saved:
				this.reset();
				break;
			case BallState.Scored:
				this.reset();
				break;
			case BallState.Active:
				this.inViewCheck();
				break;
			default:
				break;
		}
	}
}
