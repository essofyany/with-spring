import create from 'zustand';
import { getLevelInfo } from '../utils/getLevelInfo';

type BadgeImage = '/assets/level-low.png' | '/assets/level-high.png';
type Metadata = {
	nextLevelXP: number;
	currentLevel: number;
	remainingXP: number;
};
interface InitialState {
	badgeImg: BadgeImage;
	shouldAnimate: boolean;
	xp: number;
	setBadgeAnimation: (val: boolean) => void;
	setBadgeImage: (img?: BadgeImage) => void;
	setXP: (val: number) => void;
	getCurrentLevel: () => number;
	getNextLevelXP: () => number;
	getRemainingXP: () => number;
	getLogs: () => Metadata[];
	getProgressBarWidth: () => number;
}

export const useLevelUpStore = create<InitialState>((set, get) => ({
	// props
	badgeImg: '/assets/level-low.png',
	shouldAnimate: false,
	xp: 0,

	// getters
	getCurrentLevel: () => getLevelInfo({ xp: get().xp }).currentLevel,
	getProgressBarWidth: () =>
		(100 * get().getRemainingXP()) / get().getNextLevelXP(),
	getNextLevelXP: () => getLevelInfo({ xp: get().xp }).nextLevelXP,
	getRemainingXP: () => getLevelInfo({ xp: get().xp }).remainingXP,
	getLogs: () => getLevelInfo({ xp: get().xp }).logs,

	// setters
	setXP: (val) => set((state) => ({ ...state, xp: val })),
	setBadgeAnimation: (val: boolean) =>
		set((state) => ({ ...state, shouldAnimate: val })),
	setBadgeImage: (img?: BadgeImage) =>
		set((state) => ({
			...state,
			badgeImg: img ? img : '/assets/level-high.png',
		})),
}));
