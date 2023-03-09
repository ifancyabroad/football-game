import "phaser";
import {Ball} from "./objects/ball";
import {Button} from "./objects/button";
import {Floor} from "./objects/floor";
import {Goal} from "./objects/goal";
import {Goalkeeper} from "./objects/goalkeeper";
import {Player} from "./objects/player";
import {ScoreCounter} from "./objects/scoreCounter";

export default class Demo extends Phaser.Scene {
	public score: number;
	public scoreCounter: ScoreCounter;
	public floor1: Floor;
	public floor2: Floor;
	public goal: Goal;
	public goalkeeper: Goalkeeper;
	public ball: Ball;
	public player: Player;
	public button: Button;

	constructor() {
		super("demo");
	}

	preload() {
		this.load.image("ball", "assets/ball.png");
		this.load.image("background", "assets/goal2.jpg");
		this.load.image("button", "assets/button.png");
		this.load.image("goalkeeper", "assets/goalkeeper.png");
		this.load.image("boot", "assets/boot.png");
		this.load.image("goal_text", "assets/goal_text.png");
		this.load.audio("kick", "assets/sport_soccer_ball_kick.mp3");
		this.load.audio("goal", "assets/human_crowd_approx_150_people_cheer_indoors.mp3");
		this.load.audio("save", "assets/mixkit-soccer-ball-quick-kick-2108.wav");
	}

	create() {
		this.add.image(0, 0, "background").setOrigin(0);

		this.score = 0;
		this.scoreCounter = new ScoreCounter(this, 640, 20, "GOALS: 0", {
			fontSize: "24px",
			fontFamily: "Arial, sans-serif",
			stroke: "#000000",
			strokeThickness: 6,
		});
		this.floor1 = new Floor(this, 400, 500, 0, 0, 800, 0);
		this.floor2 = new Floor(this, 400, 380, 0, 0, 800, 0);
		this.goal = new Goal(this, 400, 240, 400, 140);
		this.goalkeeper = new Goalkeeper(this, 400, 280);
		this.ball = new Ball(this, 0, 300, "ball");
		this.player = new Player(this, 400, 480, "boot");
		this.button = new Button(this, 400, 550);

		this.physics.add.collider(this.ball, this.floor1);
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
