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
			.setVelocity(300, -50);
	}

	public reset = () => {
		const position = Phaser.Math.Between(200, 400);
		const velocityX = Phaser.Math.Between(250, 350);
		const velocityY = Phaser.Math.Between(0, -50);
		this.setPosition(0, position).setVelocity(velocityX, velocityY);
	};
}
