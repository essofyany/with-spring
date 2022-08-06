import { useRef } from 'react';
import { config, useSpring, animated } from 'react-spring';
import { useLevelUpStore } from '../context/levelUpSlice';

export function ProgressBar() {
	const {
		setBadgeImage,
		setBadgeAnimation,
		getCurrentLevel,
		getProgressBarWidth,
	} = useLevelUpStore();

	const roundRef = useRef(1);
	const [props, api] = useSpring(() => ({
		from: { width: '0%' },
		to: async (animate) => {
			if (getCurrentLevel() === 1) {
				return await animate({ to: { width: getProgressBarWidth() + '%' } });
			}
			if (roundRef.current >= getCurrentLevel()) {
				setTimeout(() => {
					setBadgeImage('/assets/level-high.png');
					setBadgeAnimation(true);
				}, 700);
				return await animate({ to: { width: getProgressBarWidth() + '%' } });
			} else {
				setBadgeAnimation(false);
				return await animate({ to: { width: '100%' } });
			}
		},
		loop: () => getCurrentLevel() > roundRef.current++,
		config: { ...config.default, duration: 800 },
	}));

	return (
		<div className='w-3/4 lg:w-1/3 h-4 bg-white/20 rounded-full'>
			<animated.div
				style={props}
				className='relative max-w-full h-full bg-gradient-to-r from-darkBlue to-lightBlue rounded-full'>
				<div
					style={{ filter: 'blur(14px)' }}
					className='w-full h-full bg-gradient-to-r from-darkBlue to-lightBlue rounded-full'
				/>
				<ProgressValue />
				<Star />
			</animated.div>
		</div>
	);
}

function ProgressValue() {
	const { getLogs } = useLevelUpStore();
	return (
		<div className='absolute w-fit -top-10 -right-6 flex text-white font-semibold gap-1'>
			<p>{getLogs()[getLogs().length - 1].remainingXP.toFixed(0)}</p>/
			<p>{getLogs()[getLogs().length - 1].nextLevelXP.toFixed(0)}</p>
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
