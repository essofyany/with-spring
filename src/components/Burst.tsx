import { useSpring, animated, config } from 'react-spring';
import { useLevelUpStore } from '../context/levelUpSlice';

export const Burst = () => {
	const { shouldAnimate } = useLevelUpStore();
	const styles = useSpring({
		from: { scale: 0, opacity: 0, filter: 'blur(20px)' },
		to: async (next, cancel) => {
			if (shouldAnimate) {
				await next({
					opacity: 1,
					delay: 500,
					scale: 1,
					config: config.slow,
					filter: 'blur(0px)',
				});
				await next({
					opacity: 0,
					scale: 1,
					delay: 2500,
					config: config.slow,
					filter: 'blur(20px)',
				});
			} else {
				await next({
					scale: 0,
					opacity: 0,
					config: config.gentle,
					filter: 'blur(0px)',
				});
			}
		},
	});
	return (
		<animated.figure
			style={styles}
			className='absolute -top-40 -left-40 md:top-0 md:left-0 z-0 w-[1100px] md:w-full h-[1100px] md:h-full'>
			<img
				className='w-full h-full object-fill'
				src='/assets/burst.png'
				alt='burst'
			/>
		</animated.figure>
	);
};
