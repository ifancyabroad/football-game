export class Loading extends Phaser.Scene {
	constructor() {
		super("loading");
	}

	preload() {
		this.load.image("menu_background", "assets/ui/blueBG.png");
		this.load.image("yellow_button", "assets/ui/yellowRectNormal.png");
		this.load.image("yellow_button_tapped", "assets/ui/yellowRectTapped.png");
		this.load.image("goals_background", "assets/ui/starIcon.png");
		this.load.image("timer_background", "assets/ui/borderCircle.png");

		this.load.image("ball", "assets/ball.png");
		this.load.image("background", "assets/goal2.jpg");
		this.load.image("button", "assets/button.png");
		this.load.image("goalkeeper", "assets/goalkeeper.png");
		this.load.image("boot", "assets/boot.png");
		this.load.image("goal_text", "assets/goal_text.png");
		this.load.audio("kick", "assets/sport_soccer_ball_kick.mp3");
		this.load.audio(
			"goal",
			"assets/zapsplat_multimedia_game_sound_collect_point_space_game_001_97071.mp3"
		);
		this.load.audio("save", "assets/mixkit-soccer-ball-quick-kick-2108.wav");
	}

	create() {
		this.scene.start("menu");
	}
}
