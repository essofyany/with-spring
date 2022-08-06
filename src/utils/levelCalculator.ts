interface LevelCalculatorProps {
	xp: number;
	nextLevelXP?: number;
	currentLevel?: number;
	factor?: number;
}
export function levelCalculator({
	xp = 2800, // your XP pints
	nextLevelXP = 1000, // XP points required to pass to the next level
	currentLevel = 1, // initial level is 1
	factor = 1.3, // factor to make sure that each level gonna required more XP than perv one
}: LevelCalculatorProps): {
	currentLevel: number;
	nextLevelXP: number;
	remainingXP: number;
} {
	// console.log('my XP: ', xp);
	// console.log('currentLevel: ', currentLevel);
	// console.log('nextLevelXP: ', nextLevelXP);
	// console.log('#####################');
	if (xp >= nextLevelXP) {
		xp = xp - nextLevelXP;
		// console.log('my XP: ', xp);
		currentLevel++;
		// console.log('currentLevel: ', currentLevel);
		nextLevelXP = nextLevelXP * factor;
		// console.log('nextLevelXP: ', nextLevelXP);
		// console.log('#####################');
		return levelCalculator({ xp, nextLevelXP, currentLevel });
	}
	return { currentLevel, nextLevelXP, remainingXP: xp };
}
