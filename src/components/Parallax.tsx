import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import secondaryBg from '../assets/secondary-bg.svg';
import foreground from '../assets/foreground.svg';

export default function Parallax({
	setIsStartPage,
}: {
	setIsStartPage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'],
	});
	const mountainsBackgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '150%']);
	const secondaryBackgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '300%']);

	return (
		<>
			<div
				ref={containerRef}
				className="w-full h-screen overflow-hidden relative grid place-items-center bg-[#AACBEC]">
				<div className="relative z-20 top-[-15%] md:top-[-25%]">
					<h1 className="font-bold text-white text-center text-7xl md:text-8xl drop-shadow">
						Camper Cards
					</h1>
					<h2 className="text-white text-center text-3xl md:text-4xl drop-shadow mt-5">
						A Memory Game
					</h2>
				</div>
				<motion.div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: `url('/mountains.svg')`,
						backgroundPosition: 'center 70%',
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						y: mountainsBackgroundY,
					}}></motion.div>
				<motion.div
					className="absolute inset-0 z-10"
					style={{
						backgroundImage: `url(${secondaryBg})`,
						backgroundPosition: 'center 80%',
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						y: secondaryBackgroundY,
					}}></motion.div>
				<div
					className="absolute inset-0 z-20"
					style={{
						backgroundImage: `url(${foreground})`,
						backgroundPosition: 'bottom',
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
					}}></div>
			</div>
			<div className="w-full h-[60vh] overflow-hidden bg-[#1C1A6B] text-center content-center">
				<p className="w-11/12 md:w-6/12 text-white text-xl md:text-3xl mx-auto text-pretty">
					After a day on the trails, you relax in your camper van by the lake, the soft blue sky
					above. With the calm water reflecting the light, you pull out a deck of cards for a
					relaxing memory game...
				</p>

				<button
					className="mt-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-6 py-3.5 text-center mt-6 mb-2"
					onClick={() => setIsStartPage(false)}>
					Start Game
				</button>
			</div>
		</>
	);
}
