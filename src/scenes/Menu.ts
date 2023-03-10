import {Button} from "../objects";

export class Menu extends Phaser.Scene {
	public button: Button;

	constructor() {
		super("menu");
	}

	create() {
		this.add.image(0, 0, "background").setOrigin(0);

		this.add.image(400, 300, "menu_background");
		this.add
			.text(400, 230, "BEAT THE KEEPER!", {
				fontSize: "20px",
				fontFamily: "Arial, sans-serif",
			})
			.setOrigin(0.5);
		this.add
			.text(400, 270, "Score as many goals as you can in the time limit.", {
				fontSize: "16px",
				fontFamily: "Arial, sans-serif",
				wordWrap: {
					width: 200,
				},
			})
			.setOrigin(0.5);
		this.button = new Button(this, 400, 350);
	}
}
