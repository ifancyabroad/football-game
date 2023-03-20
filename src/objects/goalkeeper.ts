import {Game} from "../scenes";

enum GoalkeeperState {
	Idle,
	Tracking,
}

export class Goalkeeper extends Phaser.GameObjects.Container {
	public sprite: Phaser.Physics.Arcade.Sprite;
	public leftHand: Phaser.GameObjects.Arc;
	public rightHand: Phaser.GameObjects.Arc;

	constructor(
		scene: Phaser.Scene,
		x?: number,
		y?: number,
		children?: Phaser.GameObjects.GameObject[]
	) {
		super(scene, x, y, children);

		this.setState(GoalkeeperState.Idle);

		this.setData({
			defaultPosition: x,
			lastLocation: x,
			speed: 60,
			distance: 60,
			maxDistance: 120,
			handSize: 20,
		});

		this.sprite = scene.physics.add.sprite(0, 0, "goalkeeper").setBodySize(60, 160, true);
		this.leftHand = scene.add.circle(-60, 0, this.data.values.handSize);
		this.rightHand = scene.add.circle(60, 0, this.data.values.handSize);
		this.scene.physics.world.enable([this.leftHand, this.rightHand]);

		if ("setCircle" in this.leftHand.body) {
			this.leftHand.body.setCircle(this.data.values.handSize);
		}

		if ("setCircle" in this.rightHand.body) {
			this.rightHand.body.setCircle(this.data.values.handSize);
		}

		this.add([this.sprite, this.leftHand, this.rightHand]);

		scene.add.existing(this).setSize(200, 200);
		scene.physics.add.existing(this);

		if ("setVelocityX" in this.body) {
			this.body.setVelocityX(this.data.values.speed);
		}
	}

	private move = () => {
		if (!(this.body instanceof Phaser.Physics.Arcade.Body)) {
			return;
		}

		const distanceFromDefault = this.x - this.data.values.defaultPosition;
		const distanceFromLastPosition = this.x - this.data.values.lastLocation;
		if (distanceFromDefault >= this.data.values.maxDistance) {
			this.body.setVelocityX(-this.data.values.speed);
			this.setData("lastLocation", this.x);
		}
		if (distanceFromDefault <= -this.data.values.maxDistance) {
			this.body.setVelocityX(this.data.values.speed);
			this.setData("lastLocation", this.x);
		}
		if (
			distanceFromLastPosition >= this.data.values.distance ||
			distanceFromLastPosition <= -this.data.values.distance
		) {
			const direction = Phaser.Math.Between(0, 1);
			const speed = direction ? this.data.values.speed : -this.data.values.speed;
			this.body.setVelocityX(speed);
			this.setData("lastLocation", this.x);
		}
	};

	private trackBall = () => {
		if (!(this.body instanceof Phaser.Physics.Arcade.Body)) {
			return;
		}

		const scene = this.scene as Game;

		if (this.x > scene.ball.x) {
			this.body.setVelocityX(-this.data.values.speed * 3);
		}

		if (scene.ball.x > this.x) {
			this.body.setVelocityX(this.data.values.speed * 3);
		}
	};

	public startTracking = () => {
		this.setState(GoalkeeperState.Tracking);
	};

	public stopTracking = () => {
		this.setState(GoalkeeperState.Idle);
	};

	update() {
		switch (this.state) {
			case GoalkeeperState.Idle:
				this.move();
				break;
			case GoalkeeperState.Tracking:
				this.trackBall();
				break;
			default:
				break;
		}
	}
}
