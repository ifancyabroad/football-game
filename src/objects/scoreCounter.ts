export class ScoreCounter extends Phaser.GameObjects.Text {
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		text: string | string[],
		style: Phaser.Types.GameObjects.Text.TextStyle
	) {
		super(scene, x, y, text, style);

		scene.add.existing(this);
	}

	public updateScore = (score: number) => {
		this.setText(`GOALS: ${score}`);
	};
}
