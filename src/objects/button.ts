export class Button extends Phaser.GameObjects.Container {
	private background: Phaser.GameObjects.Image;
	private text: Phaser.GameObjects.Text;

	constructor(
		scene: Phaser.Scene,
		text: string,
		x?: number,
		y?: number,
		children?: Phaser.GameObjects.GameObject[]
	) {
		super(scene, x, y, children);

		this.setData("defaultPosition", y);

		this.background = scene.add.image(0, 0, "yellow_button").setScale(0.5);
		this.text = scene.add
			.text(0, 0, text, {
				fontSize: "24px",
				fontFamily: "'Lilita One', cursive",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5, 0.5);

		this.add([this.background, this.text]);

		this.background
			.setInteractive({useHandCursor: true})
			.on("pointerout", this.enterButtonRestState, this)
			.on("pointerdown", this.enterButtonActiveState, this)
			.on("pointerup", () => {
				this.enterButtonRestState();
				this.scene.scene.start("game");
			});

		scene.add.existing(this);
	}

	private enterButtonRestState() {
		this.background.setTexture("yellow_button");
	}

	private enterButtonActiveState() {
		this.background.setTexture("yellow_button_tapped");
	}
}
