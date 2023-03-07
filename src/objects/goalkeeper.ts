export class Goalkeeper extends Phaser.Physics.Arcade.Sprite {
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string | Phaser.Textures.Texture,
		frame?: string | number
	) {
		super(scene, x, y, texture, frame);

		scene.add.existing(this);
		scene.physics.add.existing(this).setBodySize(60, 160, true).setVelocityX(60);

		this.setData({
			defaultPosition: x,
			lastLocation: x,
			speed: 60,
			distance: 60,
			maxDistance: 120,
		});
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

	update() {
		this.move();
	}
}
