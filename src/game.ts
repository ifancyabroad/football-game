import "phaser";
import {Ball} from "./objects/ball";
import {TextButton} from "./objects/button";
import {Floor} from "./objects/floor";
import {Goal} from "./objects/goal";
import {Player} from "./objects/player";

export default class Demo extends Phaser.Scene {
	player: Player;
	ball: Ball;
	goal: Goal;

	constructor() {
		super("demo");
	}

	preload() {
		this.load.image("ball", "assets/ball.png");
		this.load.image("background", "assets/goal2.jpg");
	}

	create() {
		const background = this.add.image(0, 0, "background").setOrigin(0);
		const floor = new Floor(this, 400, 500, 0, 0, 800, 0);
		this.goal = new Goal(this, 400, 240, 400, 120);
		this.ball = new Ball(this, 0, 300, "ball");
		this.player = new Player(this, 400, 500, 50, 100);
		const button = new TextButton(
			this,
			400,
			550,
			"LAUNCH BALL",
			{color: "#00f "},
			this.ball.reset
		);

		this.physics.add.collider(this.ball, floor);
	}
}

const config = {
	type: Phaser.AUTO,
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
