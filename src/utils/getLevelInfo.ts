type Metadata = {
	nextLevelXP: number;
	currentLevel: number;
	remainingXP: number;
};
interface Props extends Partial<Metadata> {
	xp: number;
	factor?: number;
	logs?: Metadata[];
}

interface Output extends Metadata {
	logs: Metadata[];
}

export function getLevelInfo({
	xp = 2800, // your XP pints
	nextLevelXP = 1000, // XP points required to pass to the next level
	currentLevel = 1, // initial level is 1
	factor = 1.3, // factor to make sure that each level gonna required more XP than perv one
	logs = [{ nextLevelXP: 1000, currentLevel: 1, remainingXP: xp }], // arr of prev levels with info
}: Props): Output {
	if (xp >= nextLevelXP) {
		xp = xp - nextLevelXP;
		currentLevel++;
		nextLevelXP = nextLevelXP * factor;
		logs.push({ nextLevelXP, currentLevel, remainingXP: xp });
		return getLevelInfo({ xp, nextLevelXP, currentLevel, logs });
	}
	return { currentLevel, nextLevelXP, remainingXP: xp, logs };
}
