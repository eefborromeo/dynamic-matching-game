import { createContext } from 'react';
interface GameContextType {
	counter: number | '';
	score: number;
}
const GameContext = createContext<GameContextType | undefined>(undefined);
function GameProvider({ children }: { children: React.ReactNode }) {
	const [counter, setCounter] = useState<number | ''>(1);
	const [score, setScore] = useState<number>(0);
	const value: GameContextType = {
		counter,
		score,
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
