import { useGame } from '../context/GameContext';
import Card from './Card';

export default function GameBoard() {
	const { shuffledCards, firstSelectedCard, secondSelectedCard } = useGame();
	return (
		<div className="w-full grid grid-cols-2 md:grid-cols-6 gap-4 mb-20">
			{shuffledCards.map(item => (
				<Card
					key={item.id}
					cardData={item}
					isFlipped={
						item.id === firstSelectedCard?.id || item.id === secondSelectedCard?.id || item.matched
					}
				/>
			))}
		</div>
	);
}
