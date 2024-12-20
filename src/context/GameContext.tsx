import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CardType } from '../models/CardType';

interface GameContextType {
	counter: number | '';
	score: number;
	isGameFinished: boolean;
	shuffledCards: CardType[];
	firstSelectedCard: CardType | null;
	secondSelectedCard: CardType | null;
	isChecking: boolean;
	handleIncrement: () => void;
	handleDecrement: () => void;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCardClick: (item: CardType) => void;
	resetGame: () => void;
	restartGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const defaultCardState: CardType[] = [{ id: uuidv4(), value: 1, matched: false }];

function GameProvider({ children }: { children: React.ReactNode }) {
	const [counter, setCounter] = useState<number | ''>(1);
	const [initialNumbers, setInitialNumbers] = useState<CardType[]>(defaultCardState);
	const [shuffledCards, setShuffledCards] = useState<CardType[]>([]);
	const [firstSelectedCard, setFirstSelectedCard] = useState<CardType | null>(null);
	const [secondSelectedCard, setSecondSelectedCard] = useState<CardType | null>(null);
	const [isChecking, setIsChecking] = useState<boolean>(false);
	const [score, setScore] = useState<number>(0);
	const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

	function handleDecrement() {
		if (typeof counter === 'number' && counter > 1) {
			resetSelectedCards();
			setCounter(prev => (typeof prev === 'number' && prev > 1 ? prev - 1 : 1));
			setInitialNumbers(prev => prev.slice(0, -1));
		}
	}

	function handleIncrement() {
		if (typeof counter === 'number') {
			resetSelectedCards();
			setCounter(prev => (typeof prev === 'number' ? prev + 1 : 1));
			setInitialNumbers(prev => [...prev, { id: uuidv4(), value: counter + 1, matched: false }]);
		}
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const inputValue = e.target.value;

		if (/^\d*$/.test(inputValue)) {
			setCounter(inputValue === '' ? '' : parseInt(inputValue, 10));

			if (inputValue !== '') {
				const updatedArray = Array.from({ length: parseInt(inputValue) }, (_, i) => {
					return { id: uuidv4(), value: i + 1, matched: false };
				});
				setInitialNumbers(updatedArray);
			}
		}
	}

	function generateShuffledCard() {
		const duplicated = initialNumbers.map(card => ({ ...card, id: uuidv4() }));
		return [...initialNumbers, ...duplicated].sort(() => Math.random() - 0.5);
	}

	function updateShuffledCards() {
		setShuffledCards(generateShuffledCard());
	}

	const handleCardClick = useCallback(
		(item: CardType) => {
			if (!firstSelectedCard) {
				setFirstSelectedCard(item);
			} else {
				setSecondSelectedCard(item);
				setIsChecking(true);
			}
		},
		[firstSelectedCard]
	);

	function resetSelectedCards() {
		setFirstSelectedCard(null);
		setSecondSelectedCard(null);
	}

	function resetGame() {
		setCounter(1);
		setScore(0);
		resetSelectedCards();
		setInitialNumbers([{ id: uuidv4(), value: 1, matched: false }]);
	}

	function restartGame() {
		resetGame();
		setIsGameFinished(false);
	}

	useEffect(() => {
		if (firstSelectedCard && secondSelectedCard) {
			setScore(prev => prev + 1);

			if (
				firstSelectedCard.id !== secondSelectedCard.id &&
				firstSelectedCard.value === secondSelectedCard.value
			) {
				setShuffledCards(prevCards =>
					prevCards.map(card =>
						card.value === firstSelectedCard.value ? { ...card, matched: true } : card
					)
				);
				setIsChecking(false);
				resetSelectedCards();
			} else {
				const timeout = setTimeout(() => {
					setIsChecking(false);
					resetSelectedCards();
				}, 800);

				return () => clearTimeout(timeout);
			}
		}
	}, [firstSelectedCard, secondSelectedCard]);

	useEffect(() => {
		updateShuffledCards();
	}, [initialNumbers]);

	useEffect(() => {
		if (shuffledCards.length !== 0) {
			if (shuffledCards.every(item => item.matched === true)) {
				const timeout = setTimeout(() => {
					setIsGameFinished(true);
				}, 1500);

				return () => clearTimeout(timeout);
			}
		}
	}, [shuffledCards]);

	const value: GameContextType = {
		counter,
		score,
		isGameFinished,
		shuffledCards,
		firstSelectedCard,
		secondSelectedCard,
		isChecking,
		handleIncrement,
		handleDecrement,
		handleInputChange,
		handleCardClick,
		resetGame,
		restartGame,
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

const useGame = (): GameContextType => {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error('useGame must be used within a GameProvider');
	}
	return context;
};

export { GameProvider, useGame };
