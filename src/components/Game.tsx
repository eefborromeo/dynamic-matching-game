import GameControls from './GameControls';
import GameBoard from './GameBoard';
import Congratulations from './Congratulations';
import { useGame } from '../context/GameContext';

export default function Game() {
	const { isGameFinished } = useGame();
	return (
		<>
			<div className="w-full bg-[#1C1A6B]">
				<div className="w-full min-h-screen relative grid place-items-centers bg-[#AACBEC]">
					<div className="mountains absolute inset-0 z-0"></div>
					<div className="secondaryBg absolute inset-0 z-10"></div>
					<div className="foreground absolute inset-0 z-20"></div>

					<div className="w-9/12 mx-auto relative inset-0 z-30 text-center mt-10">
						{!isGameFinished ? (
							<>
								<GameControls />
								<GameBoard />
							</>
						) : (
							<Congratulations />
						)}
					</div>
				</div>
			</div>
		</>
	);
}
