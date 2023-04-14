export const getScores = () => {
	const defaultScores = [0, 0, 0, 0, 0, 0];
	const scores = localStorage.getItem("beatTheKeeperScores");
	if (scores) {
		return JSON.parse(scores) as number[];
	}
	return defaultScores;
};

export const saveScore = (score: number) => {
	const scores = getScores();
	scores.push(score);
	scores.sort((a, b) => b - a);
	const newScores = scores.slice(0, 5);
	localStorage.setItem("beatTheKeeperScores", JSON.stringify(newScores));
};
