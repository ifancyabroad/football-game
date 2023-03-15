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
			.text(400, 230, "CONGRATULATIONS!", {
				fontSize: "24px",
				fontFamily: "'Lilita One', cursive",
				align: "center",
			})
			.setOrigin(0.5);
		this.add
			.text(400, 270, `You scored a total of ${data.score} goals.`, {
				fontSize: "16px",
				fontFamily: "'Lilita One', cursive",
				align: "center",
				wordWrap: {
					width: 200,
				},
			})
			.setOrigin(0.5);
		this.button = new Button(this, "PLAY AGAIN", 400, 350);
	}
}
