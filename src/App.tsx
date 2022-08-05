import { useState } from 'react';
import { Badge } from './components/Badge';
import { Burst } from './components/Burst';
import { Level } from './components/Level';
import { ProgressBar } from './components/ProgressBar';

export default function App() {
	const [isVisible, toggle] = useState(true);
	const [xp, setXp] = useState(3000);
	const [level, setLevel] = useState(2);
	const [badge, setBadge] = useState('/assets/level-low.png');

	const changeBadge = () => {
		setBadge((prev) =>
			prev.includes('low') ? '/assets/level-high.png' : '/assets/level-low.png',
		);
	};

	return (
		<>
			<div className='relative w-full h-screen bg-dark overflow-hidden'>
				<Burst isVisible={isVisible} />
				<div className='w-10/12 mx-auto h-full flex flex-col items-center justify-center relative z-10'>
					<Badge badgeImage={badge} />
					<Level isVisible={isVisible} />
					<ProgressBar xp={xp} level={level} />
				</div>
				<div className='absolute top-0 flex gap-4 z-50 bg-slate-500 w-full justify-center p-2'>
					<button
						onClick={() => toggle(!isVisible)}
						className='w-fit z-10 px-5 py-1 bg-lightBlue'>
						Toggle
					</button>
					<input
						type='number'
						value={xp}
						onChange={(e) => setXp(parseInt(e.target.value))}
						step={100}
						min={0}
					/>
					<input
						type='number'
						value={level}
						onChange={(e) => setLevel(parseInt(e.target.value))}
						step={1}
						min={0}
					/>
					<button
						onClick={changeBadge}
						className=' w-fit z-10 px-5 py-1 bg-lightBlue'>
						chnage badge
					</button>
				</div>
			</div>
		</>
	);
}
