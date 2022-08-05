import { config, useTransition, animated } from 'react-spring';

interface LevelProps {
	isVisible?: boolean;
}

export function Level({ isVisible = true }: LevelProps) {
	const transitions = useTransition(isVisible, {
		from: { opacity: 0, scale: 0 },
		enter: { opacity: 1, scale: 1 },
		leave: { opacity: 0, scale: 0 },
		config: { ...config.wobbly, bounce: 0, duration: 250 },
	});

	return transitions((style, item) =>
		item ? (
			<animated.figure style={style} className=''>
				<img
					className='w-full h-full object-cover'
					src='/assets/level-name.png'
					alt='burst'
				/>
			</animated.figure>
		) : (
			<></>
		),
	);
}
