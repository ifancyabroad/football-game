export class RestartButton extends Phaser.GameObjects.Container {
	private background: Phaser.GameObjects.Image;
	private icon: Phaser.GameObjects.Image;

	constructor(
		scene: Phaser.Scene,
		x?: number,
		y?: number,
		children?: Phaser.GameObjects.GameObject[]
	) {
		super(scene, x, y, children);

		this.setData("defaultPosition", y);

		this.background = scene.add.image(0, 0, "blue_button").setScale(0.25);
		this.icon = scene.add.image(0, 0, "restore_icon").setScale(0.15).setOrigin(0.5, 0.5);

		this.add([this.background, this.icon]);

		this.background
			.setInteractive({useHandCursor: true})
			.on("pointerout", this.enterButtonRestState, this)
			.on("pointerdown", this.enterButtonActiveState, this)
			.on("pointerup", () => {
				this.enterButtonRestState();
				this.scene.scene.restart();
			});

		scene.add.existing(this);
	}

	private enterButtonRestState() {
		this.background.setTexture("blue_button");
	}

	private enterButtonActiveState() {
		this.background.setTexture("blue_button_tapped");
	}
}
