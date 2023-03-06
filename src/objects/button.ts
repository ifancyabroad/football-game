import Demo from "../game";

export class Button extends Phaser.GameObjects.Container {
	private background: Phaser.GameObjects.Image;
	private text: Phaser.GameObjects.Text;

	constructor(
		scene: Phaser.Scene,
		x?: number,
		y?: number,
		children?: Phaser.GameObjects.GameObject[]
	) {
		super(scene, x, y, children);

		this.background = scene.add.image(0, 0, "button").setScale(0.4);
		this.text = scene.add
			.text(0, 0, "LAUNCH BALL", {
				fontSize: "18px",
				fontFamily: "Arial, sans-serif",
			})
			.setOrigin(0.5, 0.5);

		this.add([this.background, this.text]);

		this.background
			.setInteractive({useHandCursor: true})
			.on("pointerout", this.enterButtonRestState, this)
			.on("pointerdown", this.enterButtonActiveState, this)
			.on("pointerup", () => {
				const demoScene = scene as Demo;
				this.enterButtonRestState();
				demoScene.ball.reset();
			});

		this.setData("defaultPosition", y);

		scene.add.existing(this);
	}

	private enterButtonRestState() {
		this.setY(this.data.values.defaultPosition);
	}

	private enterButtonActiveState() {
		this.setY(this.y + 5);
	}
}
