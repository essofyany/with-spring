import { useTransition, animated, config } from 'react-spring';

interface BusrtProps {
	isVisible?: boolean;
}

export const Burst = ({ isVisible = false }: BusrtProps) => {
	const transitions = useTransition(isVisible, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		delay: 200,
		config: config.molasses,
	});

	return transitions((style, item) =>
		item ? (
			<animated.figure
				style={style}
				className='absolute top-0 left-0 z-0 h-full w-full overflow-hidden'>
				<img
					className='w-full h-full sca object-cover'
					src='/assets/burst.png'
					alt='burst'
				/>
			</animated.figure>
		) : (
			<></>
		),
	);
};
