import { useState } from 'react';
import { Badge } from './components/Badge';
import { Burst } from './components/Burst';
import { Input } from './components/Input';
import { Level } from './components/Level';
import { ProgressBar } from './components/ProgressBar';
import { useLevelUpStore } from './context/levelUpSlice';
import { levelCalculator } from './utils/levelCalculator';
import { levelsLog } from './utils/levelsLog';

export default function App() {
	const [input, setInput] = useState(0);
	const [xp, setXp] = useState(0);
	const { setBadgeImage, setBadgeAnimation } = useLevelUpStore();
	const { currentLevel, nextLevelXP, remainingXP } = levelCalculator({ xp });

	return (
		<>
			<div className='relative w-full h-screen bg-dark overflow-hidden'>
				<Burst />
				<div className='w-10/12 mx-auto h-full flex flex-col items-center justify-center gap-4 relative z-10'>
					<Badge />
					<Level />
					{xp ? (
						<ProgressBar
							currentLevel={currentLevel}
							nextLevelXP={nextLevelXP}
							remainingXP={remainingXP}
							levelLogs={levelsLog({ xp })}
						/>
					) : (
						<></>
					)}
				</div>
				<div className='absolute top-5 flex gap-4 z-50 w-full justify-center p-2'>
					<Input
						value={input}
						onChange={setInput}
						onSubmit={() => setXp(input)}
						onClear={() => {
							setInput(0);
							setXp(0);
							setBadgeImage('/assets/level-low.png');
							setBadgeAnimation(false);
						}}
					/>
				</div>
			</div>
		</>
	);
}
