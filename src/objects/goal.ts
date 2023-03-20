export class Goal extends Phaser.GameObjects.Container {
	public goal: Phaser.GameObjects.Rectangle;
	public leftPost: Phaser.GameObjects.Rectangle;
	public rightPost: Phaser.GameObjects.Rectangle;
	public crossbar: Phaser.GameObjects.Rectangle;

	constructor(
		scene: Phaser.Scene,
		x?: number,
		y?: number,
		children?: Phaser.GameObjects.GameObject[]
	) {
		super(scene, x, y, children);

		this.goal = scene.add.rectangle(0, 10, 480, 220);
		this.leftPost = scene.add.rectangle(-250, 0, 20, 240);
		this.rightPost = scene.add.rectangle(250, 0, 20, 240);
		this.crossbar = scene.add.rectangle(0, -110, 520, 20);
		this.scene.physics.world.enable([this.goal, this.leftPost, this.rightPost, this.crossbar]);

		this.add([this.goal, this.leftPost, this.rightPost, this.crossbar]);

		scene.add.existing(this).setSize(520, 240);
		scene.physics.add.existing(this);
	}
}
