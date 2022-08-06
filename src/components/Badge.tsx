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
				y: 0,
			});
			if (shouldAnimate) {
				await next({
					config: config.gentle,
					scale: 0.2,
					background: 'white',
					borderRadius: 120,
					filter: 'blur(10px)',
					y: 0,
				});
			}
			await next({
				scale: 1,
				background: 'transparent',
				borderRadius: 0,
				filter: 'blur(0px)',
				y: 0,
			});
			if (badgeImg === '/assets/level-high.png') {
				await next({
					scale: 1,
					background: 'transparent',
					borderRadius: 0,
					filter: 'blur(0px)',
					y: -50,
					config: config.wobbly,
					delay: 1000,
				});
			}
		},
	});

	return (
		<>
			<animated.figure style={styles} className='w-60 h-60'>
				<img
					className='w-full h-full object-contain'
					src={badgeImg}
					alt='level'
				/>
			</animated.figure>
		</>
	);
}
