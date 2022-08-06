import create from 'zustand';

type BadgeImage = '/assets/level-low.png' | '/assets/level-high.png';

interface InitialState {
	badgeImg: BadgeImage;
	shouldAnimate: boolean;
	setBadgeAnimation: (val: boolean) => void;
	setBadgeImage: (img?: BadgeImage) => void;
}

export const useLevelUpStore = create<InitialState>((set) => ({
	badgeImg: '/assets/level-low.png',
	shouldAnimate: false,
	setBadgeAnimation: (val: boolean) =>
		set((state) => ({ ...state, shouldAnimate: val })),
	setBadgeImage: (img?: BadgeImage) =>
		set((state) => ({
			...state,
			badgeImg: img ? img : '/assets/level-high.png',
		})),
}));
