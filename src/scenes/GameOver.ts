import {Button} from "../objects";

export class GameOver extends Phaser.Scene {
	public button: Button;

	constructor() {
		super("gameOver");
	}

	create(data: {score: number}) {
		this.add.image(0, 0, "background").setOrigin(0);

		this.add.image(400, 300, "menu_background");
		this.add
			.text(400, 210, "TIME UP!", {
				fontSize: "24px",
				fontFamily: "'Lilita One', cursive",
				align: "center",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5);
		this.add
			.text(400, 240, "You scored", {
				fontSize: "16px",
				fontFamily: "'Lilita One', cursive",
				align: "center",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5);
		this.add
			.text(400, 270, data.score.toString(), {
				fontSize: "48px",
				fontFamily: "'Lilita One', cursive",
				align: "center",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5);
		this.button = new Button(this, "PLAY AGAIN", 400, 350);
	}
}
