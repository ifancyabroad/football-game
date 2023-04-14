import {Game} from "../scenes";

export class ScoreCounter extends Phaser.GameObjects.Container {
	private background: Phaser.GameObjects.Image;
	private text: Phaser.GameObjects.Text;
	private addScoreText: Phaser.GameObjects.Text;

	constructor(
		scene: Phaser.Scene,
		x?: number,
		y?: number,
		children?: Phaser.GameObjects.GameObject[]
	) {
		super(scene, x, y, children);

		this.background = scene.add.image(0, 0, "blue_rectangle").setScale(0.3);
		this.text = scene.add
			.text(0, 0, "0 pts", {
				fontSize: "24px",
				fontFamily: "'Lilita One', cursive",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5, 0.5);
		this.addScoreText = scene.add
			.text(0, 0, "", {
				fontSize: "12px",
				fontFamily: "'Lilita One', cursive",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setVisible(false)
			.setOrigin(0.5, -1);

		this.add([this.background, this.text, this.addScoreText]);

		scene.add.existing(this);
	}

	public updateScore = (score: number) => {
		const scene = this.scene as Game;
		scene.score += score;
		this.text.setText(scene.score.toString() + " pts");

		this.addScoreText
			.setVisible(true)
			.setAlpha(1)
			.setText("+" + score);
		this.scene.time.delayedCall(
			400,
			() => {
				this.scene.add.tween({
					targets: this.addScoreText,
					alpha: 0,
					duration: 100,
					callbackScope: this,
					onComplete: () => {
						this.addScoreText.setVisible(false);
					},
				});
			},
			null,
			this
		);
	};
}
