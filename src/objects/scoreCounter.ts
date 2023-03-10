export class ScoreCounter extends Phaser.GameObjects.Container {
	private background: Phaser.GameObjects.Image;
	private text: Phaser.GameObjects.Text;

	constructor(
		scene: Phaser.Scene,
		x?: number,
		y?: number,
		children?: Phaser.GameObjects.GameObject[]
	) {
		super(scene, x, y, children);

		this.background = scene.add.image(0, 0, "goals_background").setScale(0.25);
		this.text = scene.add
			.text(0, 0, "0", {
				fontSize: "24px",
				fontFamily: "Arial, sans-serif",
			})
			.setOrigin(0.5, 0.5);

		this.add([this.background, this.text]);

		scene.add.existing(this);
	}

	public updateScore = (score: number) => {
		this.text.setText(score.toString());
	};
}
