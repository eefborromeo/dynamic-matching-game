import { useGame } from '../context/GameContext';

export default function Congratulations() {
	return (
		<div className="mt-20 text-white">
			<h3 className="text-7xl font-bold mb-10">Congratulations! 🎉</h3>
			<p className="text-xl">You’ve won with sharp focus and skill. Ready for another round?</p>
			<button
				type="button"
				className="mt-10 stext-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
				>
				Restart Game
			</button>
		</div>
	);
}
