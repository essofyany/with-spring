import { useState } from 'react';

import { Badge } from './components/Badge';
import { Burst } from './components/Burst';
import { Input } from './components/Input';
import { Level } from './components/Level';
import { ProgressBar } from './components/ProgressBar';
import { useLevelUpStore } from './context/levelUpSlice';

export default function App() {
	const [input, setInput] = useState(0);
	const { setBadgeImage, setBadgeAnimation, xp, setXP } = useLevelUpStore();

	return (
		<>
			<div className='relative w-full h-screen bg-dark overflow-hidden'>
				<Burst />
				<div className='w-10/12 mx-auto h-full flex flex-col items-center justify-center gap-4 relative z-10'>
					<Badge />
					<Level />
					{xp ? <ProgressBar /> : <></>}
				</div>
				<div className='absolute top-5 flex gap-4 z-50 w-full justify-center p-2'>
					<Input
						value={input}
						onChange={setInput}
						onSubmit={() => setXP(input)}
						onClear={() => {
							setInput(0);
							setXP(0);
							setBadgeImage('/assets/level-low.png');
							setBadgeAnimation(false);
						}}
					/>
				</div>
			</div>
		</>
	);
}
