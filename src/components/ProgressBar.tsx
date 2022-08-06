import { useRef } from 'react';
import { config, useSpring, animated } from 'react-spring';
import { levelCalculator } from '../utils/levelCalculator';
import { levelsLog } from '../utils/levelsLog';

interface ProgressBarProps {
	xp?: number;
}

export function ProgressBar({ xp = 900 }: ProgressBarProps) {
	const roundRef = useRef(0);

	const { currentLevel, nextLevelXP, remainingXP } = levelCalculator({ xp });
	const calculatedWidth = (100 * remainingXP) / nextLevelXP;

	const props = useSpring({
		from: { width: '0%' },
		to: async (animate) => {
			await animate({
				to: {
					width:
						roundRef.current >= currentLevel - 1
							? calculatedWidth + '%'
							: '100%',
				},
			});
		},
		loop: () => currentLevel - 1 > roundRef.current++,
		config: { ...config.default, duration: 800 },
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
				<p className='text-white'>{currentLevel}</p>
				<ProgressValue xp={xp} />
				<Star />
			</animated.div>
		</div>
	);
}

function ProgressValue({ xp = 900 }) {
	const roundRef = useRef(0);

	const logs = levelsLog({ xp });
	console.log(logs);

	const { number } = useSpring({
		from: { number: 0 },
		number: logs[roundRef.current + 1]?.remainingXP || 0,
		delay: 200,
		loop: () => logs[roundRef.current]?.currentLevel - 1 > roundRef.current++,
		config: config.molasses,
	});

	return (
		<div className='absolute w-fit -top-10 -right-6 flex text-white font-semibold space-x-0.5'>
			<animated.p className=''>{number.to((n) => n.toFixed(0))}</animated.p>
			<p>/ {logs[roundRef.current + 1]?.nextLevelXP || 0}</p>
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
