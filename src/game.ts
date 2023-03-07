import "phaser";
import {Ball} from "./objects/ball";
import {Button} from "./objects/button";
import {Floor} from "./objects/floor";
import {Goal} from "./objects/goal";
import {Goalkeeper} from "./objects/goalkeeper";
import {Player} from "./objects/player";

export default class Demo extends Phaser.Scene {
	player: Player;
	ball: Ball;
	goal: Goal;
	goalkeeper: Goalkeeper;

	constructor() {
		super("demo");
	}

	preload() {
		this.load.image("ball", "assets/ball.png");
		this.load.image("background", "assets/goal2.jpg");
		this.load.image("button", "assets/button.png");
		this.load.image("goalkeeper", "assets/goalkeeper.png");
		this.load.audio("kick", "assets/sport_soccer_ball_kick.mp3");
		this.load.audio("goal", "assets/human_crowd_approx_150_people_cheer_indoors.mp3");
	}

	create() {
		const background = this.add.image(0, 0, "background").setOrigin(0);
		const floor = new Floor(this, 400, 500, 0, 0, 800, 0);
		this.goal = new Goal(this, 400, 240, 400, 140);
		this.goalkeeper = new Goalkeeper(this, 400, 280, "goalkeeper");
		this.ball = new Ball(this, 0, 300, "ball");
		this.player = new Player(this, 400, 500, 50, 100);
		const button = new Button(this, 400, 550, []);

		this.physics.add.collider(this.ball, floor);
	}

	update() {
		this.goalkeeper.update();
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
