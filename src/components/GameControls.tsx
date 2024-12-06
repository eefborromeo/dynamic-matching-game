import { useGame } from '../context/GameContext';

export default function GameControls() {
	const { score, counter, handleInputChange, handleDecrement, handleIncrement } = useGame();
	} = useGame();
	return (
		<>
			<div className="text-pretty text-4xl font-semibold tracking-tight text-white sm:text-4xl mt-10 mb-4">
				Score: <span>{score}</span>
			</div>
			<form className="max-w-s mx-auto mb-6">
				<label htmlFor="maxNum" className="mt-6 block text-lg/8 text-white/90">
					Enter the maximum number on the cards
				</label>
				<div className="relative flex items-center max-w-[11rem] mx-auto">
					<button
						type="button"
						id="decrement-button"
						className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-s-lg p-3 h-11 focus:ring-gray-700 focus:ring-2 focus:outline-none"
						onClick={handleDecrement}>
						<svg
							className="w-3 h-3 text-gray-900 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 2">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 1h16"
							/>
						</svg>
					</button>
					<input
						type="text"
						id="maxNum"
						inputMode="numeric"
						pattern="[0-9]*"
						className="border-x-0 h-11 font-medium text-center text-gray-900 text-sm block w-full bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
						value={counter}
						onChange={handleInputChange}
						required
					/>

					<button
						type="button"
						id="increment-button"
						className="bg-gray-700 hover:bg-gray-600 border-gray-600 border rounded-e-lg p-3 h-11 focus:ring-gray-700 focus:ring-2 focus:outline-none"
						onClick={handleIncrement}>
						<svg
							className="w-3 h-3 text-gray-900 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 1v16M1 9h16"
							/>
						</svg>
					</button>
				</div>
			</form>
			<button
				type="button"
				className="mb-16 text-white bg-gradient-to-r from-sky-500 to-indigo-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
				>
				Reset Game
			</button>
		</>
	);
}
