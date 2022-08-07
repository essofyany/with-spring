import { config, useSpring, animated } from 'react-spring';
import { useLevelUpStore } from '../context/levelUpSlice';

export function Level() {
	const { shouldAnimate } = useLevelUpStore();
	const styles = useSpring({
		from: { scale: 0, opacity: 0, width: 0 },
		to: async (next, cancel) => {
			if (shouldAnimate) {
				return await next({
					config: { ...config.gentle, duration: 300 },
					scale: 1,
					opacity: 1,
					width: 340,
					delay: 3500,
				});
			} else {
				return await next({
					config: config.gentle,
					scale: 0,
					opacity: 0,
					width: 0,
				});
			}
		},
	});
	return (
		<animated.figure style={styles} className='-mt-20 mb-5'>
			<img
				className='w-full h-full object-cover'
				src='/assets/level-name.png'
				alt='level name'
			/>
		</animated.figure>
	);
}
