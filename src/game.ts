import "phaser";
import {Game, GameOver, Loading, Menu} from "./scenes";

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
	scene: [Loading, Menu, Game, GameOver],
};

const game = new Phaser.Game(config);
