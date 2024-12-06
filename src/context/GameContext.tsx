import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CardType } from '../models/CardType';

interface GameContextType {
	counter: number | '';
	score: number;
	handleIncrement: () => void;
	handleDecrement: () => void;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const defaultCardState: CardType[] = [{ id: uuidv4(), value: 1, matched: false }];

function GameProvider({ children }: { children: React.ReactNode }) {
	const [counter, setCounter] = useState<number | ''>(1);
	const [initialNumbers, setInitialNumbers] = useState<CardType[]>(defaultCardState);
	const [score, setScore] = useState<number>(0);

	function handleDecrement() {
		if (typeof counter === 'number' && counter > 1) {
			setCounter(prev => (typeof prev === 'number' && prev > 1 ? prev - 1 : 1));
			setInitialNumbers(prev => prev.slice(0, -1));
		}
	}

	function handleIncrement() {
		if (typeof counter === 'number') {
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


	const value: GameContextType = {
		counter,
		score,
		handleIncrement,
		handleDecrement,
		handleInputChange,
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
