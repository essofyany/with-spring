import { useState } from 'react';
import { Badge } from './components/Badge';
import { Burst } from './components/Burst';
import { Input } from './components/Input';
import { Level } from './components/Level';
import { ProgressBar } from './components/ProgressBar';
// prev.includes('low') ? '/assets/level-high.png' : '/assets/level-low.png',

export default function App() {
	const [xp, setXp] = useState(0);
	const [input, setInput] = useState(0);

	return (
		<>
			<div className='relative w-full h-screen bg-dark overflow-hidden'>
				<Burst isVisible={true} />
				<div className='w-10/12 mx-auto h-full flex flex-col items-center justify-center relative z-10'>
					<Badge badgeImage={'/assets/level-low.png'} />
					<Level isVisible={true} />
					<ProgressBar xp={xp} />
				</div>
				<div className='absolute top-0 flex gap-4 z-50 w-full justify-center p-2'>
					<Input
						value={input}
						onChange={setInput}
						onSubmit={() => setXp(input)}
					/>
				</div>
			</div>
		</>
	);
}
