interface levelsLogProps {
	xp: number;
	nextLevelXP?: number;
	currentLevel?: number;
	factor?: number;
	logs?: {
		nextLevelXP: number;
		currentLevel: number;
		remainingXP: number;
	}[];
}
export function levelsLog({
	xp = 2800, // your XP pints
	nextLevelXP = 1000, // XP points required to pass to the next level
	currentLevel = 1, // initial level is 1
	factor = 1.3, // factor to make sure that each level gonna required more XP than perv one
	logs = [{ nextLevelXP: 1000, currentLevel: 1, remainingXP: xp }],
}: levelsLogProps): {
	nextLevelXP: number;
	currentLevel: number;
	remainingXP: number;
}[] {
	if (xp >= nextLevelXP) {
		xp = xp - nextLevelXP;
		currentLevel++;
		nextLevelXP = nextLevelXP * factor;
		logs.push({ nextLevelXP, currentLevel, remainingXP: xp });
		return levelsLog({ xp, nextLevelXP, currentLevel, logs });
	}

	return logs;
}
