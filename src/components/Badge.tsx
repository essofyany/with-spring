import { animated, config, useSpring, useTransition } from 'react-spring';
import { useEffect } from 'react';

interface BadgeProps {
	badgeImage?: string;
}

export function Badge({ badgeImage = '/assets/level-low.png' }: BadgeProps) {
	const [props, api] = useSpring(() => ({
		from: { scale: 0 },
		to: { scale: 1 },
		reverse: false,
	}));

	const transitions = useTransition(true, {
		from: { opacity: 0, scale: 0 },
		enter: { opacity: 1, scale: 1 },
		leave: { opacity: 0, scale: 0 },
		config: { ...config.wobbly, bounce: 0, duration: 250 },
	});

	useEffect(() => {
		// console.log('Badge image:', badgeImage);
		api.start();
	}, [badgeImage, api]);

	return transitions((style, item) =>
		item ? (
			<animated.figure style={style} className='w-80 h-80'>
				<animated.img
					style={props}
					className='w-full h-full object-contain'
					src={badgeImage}
					alt='level'
				/>
			</animated.figure>
		) : (
			<></>
		),
	);
}
