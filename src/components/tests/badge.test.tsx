import { render, renderHook, screen, act } from '@testing-library/react';
import { useLevelUpStore } from '../../context/levelUpSlice';
import { Badge } from '../Badge';

describe('Badge tests', () => {
	it('renders img tag with avatar image value', () => {
		render(<Badge />);
		const imgElement = screen.getByRole('img');
		const src = imgElement.getAttribute('src');
		expect(src).toEqual('/assets/level-low.png');
	});

	it('renders Level 1 badge image properly', () => {
		const { result } = renderHook(() => useLevelUpStore());
		render(<Badge />);
		const imgElement = screen.getByRole('img');
		const src = imgElement.getAttribute('src');
		const level = result.current.getCurrentLevel();
		const levelBadge = result.current.badgeImg;
		expect(level).toEqual(1);
		expect(levelBadge).toEqual('/assets/level-low.png');
		expect(src).toEqual(levelBadge);
	});

	it('renders high level badge image', async () => {
		const { result } = renderHook(() => useLevelUpStore());
		render(<Badge />);
        
		act(() => result.current.setXP(5000));
		act(() => result.current.setBadgeImage('/assets/level-high.png'));

		const imgElement = await screen.findByRole('img');
		const src = imgElement.getAttribute('src');

		const level = result.current.getCurrentLevel();
		const levelBadge = result.current.badgeImg;

		expect(level).toBeGreaterThan(1);
		expect(levelBadge).toEqual('/assets/level-high.png');
		expect(src).toEqual(levelBadge);
	});
});
