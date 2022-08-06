import { animated, config, useSpring } from 'react-spring';
import { useLevelUpStore } from '../context/levelUpSlice';

export function Badge() {
	const { shouldAnimate, badgeImg } = useLevelUpStore();
	const styles = useSpring({
		from: { scale: 1 },
		to: async (next, cancel) => {
			await next({
				scale: 1,
				background: 'transparent',
				borderRadius: 0,
				filter: 'blur(0px)',
			});
			if (shouldAnimate) {
				await next({
					config: config.gentle,
					scale: 0.2,
					background: 'white',
					borderRadius: 120,
					filter: 'blur(10px)',
				});
			}
			await next({
				scale: 1,
				background: 'transparent',
				borderRadius: 0,
				filter: 'blur(0px)',
			});
			if (badgeImg === '/assets/level-high.png') {
				await next({
					scale: 0.9,
					background: 'transparent',
					borderRadius: 0,
					filter: 'blur(0px)',
					config: { ...config.wobbly, duration: 300 },
					delay: 1000,
				});
			}
		},
	});

	return (
		<>
			<animated.figure style={styles} className='w-80 h-80'>
				<img
					className='w-full h-full object-contain'
					src={badgeImg}
					alt='level'
				/>
			</animated.figure>
		</>
	);
}
