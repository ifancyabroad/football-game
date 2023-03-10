import "phaser";
import {Game} from "./scenes";

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
		},
	},
	scene: [Game],
};

const game = new Phaser.Game(config);
