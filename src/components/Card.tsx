import { useGame } from '../context/GameContext';
import { CardType } from '../models/CardType';

interface CardProps {
	cardData: CardType;
	isFlipped: boolean;
}

export default function Card({ cardData, isFlipped }: CardProps) {
	const { isChecking, handleCardClick } = useGame();
	return (
		<div
			className={`min-h-[150px] md:min-h-[250px] group [perspective:1000px] relative mb-2 text-6xl font-bold tracking-tight text-white font-bold relative transition-all duration-500 [transform-style:preserve-3d] ${
				isFlipped ? '[transform:rotateY(180deg)]' : ''
			} ${isChecking ? 'pointer-events-none' : 'pointer-events-auto'}`}>
			<div
				className="flex justify-center items-center h-full hover:cursor-pointer w-full bg-white border border-gray-200 rounded-lg shadow sm:p-6 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 hover:bg-opacity-40 absolute inset-0 [backface-visibility:hidden]"
				onClick={() => handleCardClick(cardData)}></div>
			<div className="flex justify-center items-center h-full w-full bg-white border border-gray-200 rounded-lg shadow sm:p-6 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
				{cardData?.value}
			</div>
		</div>
	);
}
