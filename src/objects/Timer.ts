import {Game} from "../scenes";

export class Timer extends Phaser.GameObjects.Container {
	private background: Phaser.GameObjects.Image;
	private text: Phaser.GameObjects.Text;
	private timerEvent: Phaser.Time.TimerEvent;
	private initialTime: number;

	constructor(
		scene: Phaser.Scene,
		x?: number,
		y?: number,
		children?: Phaser.GameObjects.GameObject[]
	) {
		super(scene, x, y, children);

		this.background = scene.add.image(0, 0, "timer_background").setScale(0.25);
		this.text = scene.add
			.text(0, 0, "30", {
				fontSize: "24px",
				fontFamily: "'Lilita One', cursive",
				stroke: "#000",
				strokeThickness: 3,
			})
			.setOrigin(0.5, 0.5);

		this.add([this.background, this.text]);

		this.initialTime = 30;
		this.timerEvent = scene.time.addEvent({
			delay: 1000,
			callback: this.updateTimer,
			callbackScope: this,
			loop: true,
		});

		scene.add.existing(this);
	}

	public updateTimer = (time = -1) => {
		const scene = this.scene as Game;
		if (this.initialTime > 0) {
			this.initialTime += time;
			this.text.setText(this.initialTime.toString());
		} else {
			this.timerEvent.remove();
			scene.gameOver();
		}
	};
}
