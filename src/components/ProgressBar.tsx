import { useRef } from 'react';
import { config, useSpring, animated } from 'react-spring';

interface ProgressBarProps {
	xp?: number;
	level?: number;
}

export function ProgressBar({ xp = 900, level = 1 }: ProgressBarProps) {
	const calculatedWidth = getWidth(xp, level);
	const roundRef = useRef(0);
	const props = useSpring({
		from: { width: '0%' },
		to: { width: 100 * calculatedWidth + '%' },
		config: { ...config.molasses, duration: 1000 },
		loop: () => 2 > roundRef.current++,
	});
	return (
		<div className='w-3/4 h-5 bg-white/20 rounded-full'>
			<animated.div
				style={props}
				className='relative max-w-full h-full bg-gradient-to-r from-darkBlue to-lightBlue rounded-full'>
				<div
					style={{ filter: 'blur(14px)' }}
					className='w-full h-full bg-gradient-to-r from-darkBlue to-lightBlue rounded-full'
				/>
				<ProgressValue currentXP={xp} levelXP={1000} />
				<Star />
			</animated.div>
		</div>
	);
}

function ProgressValue({ currentXP = 900, levelXP = 1000 }) {
	return (
		<div className='absolute w-fit -top-10 -right-6'>
			<strong className='text-white'>
				{currentXP}/{levelXP}
			</strong>
		</div>
	);
}

function Star() {
	return (
		<div className='w-fit absolute -right-2 -top-3'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='16'
				height='16'
				fill='currentColor'
				className='h-9 w-9 text-gold'
				viewBox='0 0 16 16'>
				<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
			</svg>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='16'
				height='16'
				fill='currentColor'
				className='h-9 w-9 text-gold absolute top-0 right-0'
				style={{ filter: 'blur(8px)' }}
				viewBox='0 0 16 16'>
				<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
			</svg>
		</div>
	);
}

function getWidth(xp = 3000, currentLevel = 2): number {
	let calculatedWidth = 0;
	const range = (level = currentLevel) => {
		switch (level) {
			case 2:
				return [0, 1000];
			case 3:
				return [0, 1000, 1300];
			case 4:
				return [0, 1000, 1300, 1690];
			case 5:
				return [0, 1000, 1300, 1690, 2197];
			case 6:
				return [0, 1000, 1300, 1690, 2197, 2851];
			default:
				return [0, 1000];
		}
	};
	console.log('XP: ', xp);
	console.log('Current Level: ', currentLevel);
	console.log('range: ', range(currentLevel));
	const maxXPforCurrentLevel = range(currentLevel).reduce(
		(acc, i) => acc + i,
		0,
	);
	calculatedWidth = xp / maxXPforCurrentLevel;
	console.log('calculatedWidth: ', calculatedWidth);

	return calculatedWidth;
}
