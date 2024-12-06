import { useState } from 'react';
import Parallax from './components/Parallax';
import Game from './components/Game';
import { GameProvider } from './context/GameContext';

export default function App() {
	const [isStartPage, setIsStartPage] = useState<boolean>(true);

	return isStartPage ? (
		<Parallax setIsStartPage={setIsStartPage} />
	) : (
		<GameProvider>
			<Game />
		</GameProvider>
	);
}
