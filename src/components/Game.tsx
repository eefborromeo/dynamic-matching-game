import secondaryBg from '../assets/secondary-bg.svg';
import foreground from '../assets/foreground.svg';
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
					<div
						className="absolute inset-0 z-0"
						style={{
							backgroundImage: `url('/mountains.svg')`,
							backgroundPosition: 'bottom',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
						}}></div>
					<div
						className="absolute inset-0 z-10"
						style={{
							backgroundImage: `url(${secondaryBg})`,
							backgroundPosition: 'bottom',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
						}}></div>
					<div
						className="absolute inset-0 z-20"
						style={{
							backgroundImage: `url(${foreground})`,
							backgroundPosition: 'bottom',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
						}}></div>

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
