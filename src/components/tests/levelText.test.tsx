import { render, renderHook, screen, act } from '@testing-library/react';
import { useLevelUpStore } from '../../context/levelUpSlice';
import { Level } from '../Level';

describe('Level text tests', () => {
	it('is invisible if level <= 1', () => {
		render(<Level />);

		const imgElement = screen.getByRole('img');
		expect(imgElement).not.toBeVisible();
	})
});
