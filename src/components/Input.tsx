interface InputProps {
	value: number;
	onChange: (val: number) => void;
	onSubmit: () => void;
	onClear: () => void;
}

export function Input({ onChange, onSubmit, onClear, value }: InputProps) {
	return (
		<div className='space-x-2 w-fit bg-gradient-to-bl from-darkBlue/25 to-lightBlue/75 rounded-lg p-2'>
			<input
				className='p-2 rounded-md outline-none shadow-md'
				type='number'
				placeholder='Enter yout XP'
				value={value}
				onChange={(e) => onChange(parseInt(e.target.value))}
				step={100}
				min={0}
			/>
			<button
				onClick={onSubmit}
				className='p-2 rounded-md shadow-md hover:bg-gradient-to-tl duration-300 text-white bg-gradient-to-tr from-darkBlue to-lightBlue'
				type='button'>
				ADD XP
			</button>
			<button
				onClick={onClear}
				className='p-2 rounded-md shadow-md hover:bg-gradient-to-tl duration-300 text-white bg-gradient-to-tr from-red-400 to-red-600'
				type='button'>
				CLEAR
			</button>
		</div>
	);
}
