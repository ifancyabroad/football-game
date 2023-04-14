import {Button} from "../objects";
import {getScores} from "../utils";

export class GameOver extends Phaser.Scene {
	public button: Button;

	constructor() {
		super("gameOver");
	}

	create(data: {score: number}) {
		this.add.image(0, 0, "background").setOrigin(0);

		this.add.image(400, 300, "menu_background").setScale(1, 1.5);
		this.add
			.text(400, 170, "GAME OVER!", {
				fontSize: "24px",
				fontFamily: "'Lilita One', cursive",
				align: "center",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5);
		this.add
			.text(400, 200, `You scored ${data.score.toString()}`, {
				fontSize: "16px",
				fontFamily: "'Lilita One', cursive",
				align: "center",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5);

		this.add
			.text(370, 230, "RANK", {
				fontSize: "16px",
				fontFamily: "'Lilita One', cursive",
				align: "center",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5);

		this.add
			.text(430, 230, "SCORE", {
				fontSize: "16px",
				fontFamily: "'Lilita One', cursive",
				align: "center",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5);

		const scores = getScores();

		scores.forEach((score, index) => {
			const y = 260 + index * 20;
			this.add
				.text(370, y, `${index + 1}`, {
					fontSize: "16px",
					fontFamily: "'Lilita One', cursive",
					align: "center",
					stroke: "#000",
					strokeThickness: 3,
				})
				.setOrigin(0.5);
		});

		scores.forEach((score, index) => {
			const y = 260 + index * 20;
			const scoreDisplay = score > 0 ? score.toString() : "- - -";
			this.add
				.text(430, y, scoreDisplay, {
					fontSize: "16px",
					fontFamily: "'Lilita One', cursive",
					align: "center",
					stroke: "#000",
					strokeThickness: 3,
				})
				.setOrigin(0.5);
		});

		this.button = new Button(this, "PLAY AGAIN", 400, 410);
	}
}
