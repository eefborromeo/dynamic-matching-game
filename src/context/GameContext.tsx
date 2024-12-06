import { createContext } from 'react';
interface GameContextType {
	counter: number | '';
	score: number;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);
function GameProvider({ children }: { children: React.ReactNode }) {
	const [counter, setCounter] = useState<number | ''>(1);
	const [score, setScore] = useState<number>(0);

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
