import {
	Ball,
	Floor,
	Goal,
	GoalCounter,
	Goalkeeper,
	Player,
	RestartButton,
	ScoreCounter,
	Timer,
} from "../objects";
import {saveScore} from "../utils";

export class Game extends Phaser.Scene {
	public score: number;
	public scoreCounter: ScoreCounter;
	public goals: number;
	public goalCounter: GoalCounter;
	public timer: Timer;
	public restartButton: RestartButton;
	public floor1: Floor;
	public floor2: Floor;
	public goal: Goal;
	public goalkeeper: Goalkeeper;
	public ball: Ball;
	public player: Player;

	constructor() {
		super("game");
	}

	create() {
		this.add.image(0, 0, "background").setOrigin(0);

		this.score = 0;
		this.goals = 0;
		this.scoreCounter = new ScoreCounter(this, 400, 60);
		this.goalCounter = new GoalCounter(this, 500, 60);
		this.timer = new Timer(this, 300, 60);
		this.restartButton = new RestartButton(this, 60, 60);
		this.floor1 = new Floor(this, 400, 500, 0, 0, 800, 0);
		this.floor2 = new Floor(this, 400, 380, 0, 0, 800, 0);
		this.goal = new Goal(this, 400, 230);
		this.goalkeeper = new Goalkeeper(this, 400, 280);
		this.ball = new Ball(this, 0, 300, "ball");
		this.player = new Player(this, 400, 480, "boot");

		this.physics.add.collider(this.ball, this.floor1);

		this.ball.launch();
	}

	public gameOver() {
		saveScore(this.score);
		this.scene.start("gameOver", {score: this.score});
	}

	update() {
		this.player.update();
		this.goalkeeper.update();
		this.ball.update();
	}
}
