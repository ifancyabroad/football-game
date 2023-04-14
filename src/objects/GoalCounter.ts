import {Game} from "../scenes";

export class GoalCounter extends Phaser.GameObjects.Container {
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
				fontFamily: "'Lilita One', cursive",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5, 0.5);

		this.add([this.background, this.text]);

		scene.add.existing(this);
	}

	public addGoal = () => {
		const scene = this.scene as Game;
		scene.goals++;

		this.text.setText(scene.goals.toString());

		this.scene.add.tween({
			targets: this,
			scale: 1.4,
			duration: 300,
			yoyo: true,
			ease: "Bounce.easeInOut",
		});

		this.scene.add.tween({
			targets: this.background,
			angle: 720,
			duration: 300,
			ease: "Bounce.easeInOut",
		});
	};
}
