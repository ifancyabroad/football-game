import "phaser";
import {Ball} from "./objects/ball";
import {TextButton} from "./objects/button";
import {Floor} from "./objects/floor";
import {Player} from "./objects/player";

export default class Demo extends Phaser.Scene {
	player: Player;
	ball: Ball;

	constructor() {
		super("demo");
	}

	preload() {
		this.load.image("ball", "assets/ball.png");
	}

	create() {
		this.ball = new Ball(this, 0, 300, "ball");
		this.player = new Player(this, 400, 500, 50, 100);
		const floor = new Floor(this, 400, 500, 0, 0, 800, 0, 0x6666ff);
		const button = new TextButton(
			this,
			400,
			550,
			"LAUNCH BALL",
			{color: "#0f0 "},
			this.ball.reset
		);

		this.physics.add.collider(this.ball, floor);
	}
}

const config = {
	type: Phaser.AUTO,
	backgroundColor: "#125555",
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		},
	},
	scene: Demo,
};

const game = new Phaser.Game(config);
