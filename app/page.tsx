'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const memeSounds = [
	new URL('./sounds/you-think-say-you-dey-wise.mp3', import.meta.url).href,
	new URL('./sounds/Wrong-Answer.mp3', import.meta.url).href,
	new URL('./sounds/Suspense-1.mp3', import.meta.url).href,
	new URL('./sounds/sorry.mp3', import.meta.url).href,
	new URL('./sounds/Slap.mp3', import.meta.url).href,
	new URL('./sounds/Nollywood-Laugh.mp3', import.meta.url).href,
	new URL('./sounds/No-be-juju-be-that.mp3', import.meta.url).href,
	new URL('./sounds/How-many-times-will-they-Tell-You.mp3', import.meta.url)
		.href,
	new URL(
		'./sounds/Help-me-he-dey-carry-me-go-where-i-dont-know-sound-effect.mp3',
		import.meta.url,
	).href,
	new URL('./sounds/Funny-noise-Sound-effect.mp3', import.meta.url).href,
	new URL('./sounds/foto.mp3', import.meta.url).href,
	new URL('./sounds/Fail-2.mp3', import.meta.url).href,
	new URL('./sounds/E-shock-you-broda-shaggi.mp3', import.meta.url).href,
	new URL('./sounds/Continue.mp3', import.meta.url).href,
	new URL('./sounds/Chai-There-Is-God-O.mp3', import.meta.url).href,
	// new URL('./sounds/Carry-Me-Dey-Go.mp3', import.meta.url).href,
	new URL('./sounds/Apostle-Would-Hear-Of-This.mp3', import.meta.url).href,
	new URL('./sounds/Adult-Laugh.mp3', import.meta.url).href,
	new URL('./sounds/70-years-old-man.mp3', import.meta.url).href,
];

export default function ValentinePage() {
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [accepted, setAccepted] = useState(false);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const memeRef = useRef<HTMLAudioElement | null>(null);
	const bgRef = useRef<HTMLAudioElement | null>(null);
	const yesRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		setDimensions({ width: window.innerWidth, height: window.innerHeight });

		function onResize() {
			setDimensions({ width: window.innerWidth, height: window.innerHeight });
		}

		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	}, []);

	// Deterministic heart positions and timings so server and client markup match
	const heartConfig = Array.from({ length: 20 }).map((_, i) => {
		// left: deterministic percent based on index
		const leftPercent = (i * 73) % 100; // pseudo-random-looking but deterministic
		const duration = 6 + (i % 4) * 1.2;
		const delay = (i % 5) * 0.6;
		return { left: `${leftPercent}%`, duration, delay };
	});

	function moveNoButton(shouldPlay = false) {
		const x = Math.floor(Math.random() * 500 - 250);
		const y = Math.floor(Math.random() * 400 - 200);
		setPos({ x, y });

		if (!memeSounds || memeSounds.length === 0) return;

		const randomSound =
			memeSounds[Math.floor(Math.random() * memeSounds.length)];
		if (memeRef.current) {
			// set src to a new random sound
			memeRef.current.src = randomSound;
			// reset playback so new clip starts fresh when played
			try {
				memeRef.current.pause();
				memeRef.current.currentTime = 0;
			} catch (e) {
				/* ignore if not supported */
			}
			if (shouldPlay) {
				// play() returns a promise in modern browsers — catch rejections
				const p = memeRef.current.play?.();
				if (p && typeof p.catch === 'function') p.catch(() => {});
			}
		}
	}

	function handleYes() {
		setAccepted(true);
		// play the 'Carry-Me-Dey-Go' clip on user gesture, then start background music
		if (yesRef.current) {
			const p = yesRef.current.play?.();
			if (p && typeof p.catch === 'function') p.catch(() => {});
		}
		const bgPlay = bgRef.current?.play?.();
		if (bgPlay && typeof bgPlay.catch === 'function') bgPlay.catch(() => {});
	}

	return (
		<main className='relative min-h-screen flex items-center justify-center bg-linear-to-br from-pink-300 via-red-300 to-rose-400 overflow-hidden'>
			<audio ref={memeRef} />
			<audio
				ref={yesRef}
				src={new URL('./sounds/Carry-Me-Dey-Go.mp3', import.meta.url).href}
			/>
			<audio
				ref={bgRef}
				src='/sounds/romantic.mp3'
				loop
			/>

			{accepted && (
				<Confetti
					width={dimensions.width}
					height={dimensions.height}
				/>
			)}

			{/* Floating hearts */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				{heartConfig.map((cfg, i) => (
					<motion.div
						key={i}
						initial={{ y: '110%', opacity: 0 }}
						animate={{ y: '-10%', opacity: 1 }}
						transition={{
							duration: cfg.duration,
							repeat: Infinity,
							delay: cfg.delay,
						}}
						className='absolute text-3xl'
						style={{ left: cfg.left }}>
						💖
					</motion.div>
				))}
			</div>

			<AnimatePresence>
				{!accepted ? (
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						className='bg-white/90 backdrop-blur p-10 rounded-3xl shadow-2xl text-center max-w-md w-full relative'>
						<h1 className='text-4xl font-bold text-pink-600 mb-6'>
							Will you be my Valentine? 💘
						</h1>

						<p className='text-gray-600 mb-8'>
							Choose wisely 😏 One option may be unavailable...
						</p>

						<div className='flex justify-center gap-6 mt-6 relative h-24'>
							<button
								onClick={handleYes}
								className='px-8 py-4 bg-pink-500 hover:bg-pink-600 active:scale-95 transition text-white rounded-2xl font-bold text-lg shadow-lg'>
								Yes 💕
							</button>

							<motion.button
								animate={{ x: pos.x, y: pos.y }}
								transition={{ type: 'spring', stiffness: 300, damping: 15 }}
								onClick={() => moveNoButton(true)}
								className='px-8 py-4 bg-gray-300 text-gray-700 rounded-2xl font-bold text-lg shadow-lg absolute'>
								No 😈
							</motion.button>
						</div>

						<p className='text-sm text-gray-500 mt-8'>
							Try pressing “No” — if you can 😌
						</p>
					</motion.div>
				) : (
					<motion.div
						initial={{ scale: 0.6, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className='bg-white/90 backdrop-blur p-12 rounded-3xl shadow-2xl text-center max-w-md w-full'>
						<h1 className='text-5xl font-extrabold text-pink-600 mb-4'>
							Yayyyyy 💖🥹
						</h1>
						<p className='text-xl text-gray-700 mb-6'>
							Best decision of your life 😌
						</p>

						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
							className='text-6xl'>
							💍💘💖
						</motion.div>

						<p className='mt-8 text-gray-600'>
							See you on our Valentine date 😏
						</p>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Love Letter Overlay */}
			<AnimatePresence>{accepted && <LoveLetter />}</AnimatePresence>
		</main>
	);
}

function LoveLetter() {
	const [open, setOpen] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50'>
			<motion.div
				initial={{ scale: 0.7 }}
				animate={{ scale: 1 }}
				className='bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm w-full'>
				{!open ? (
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setOpen(true)}
						className='cursor-pointer'>
						<div className='text-7xl'>💌</div>
						<p className='mt-4 text-gray-600'>Tap to open your love letter</p>
					</motion.div>
				) : (
					<motion.div
						initial={{ scale: 0.6, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}>
						<h2 className='text-3xl font-extrabold text-pink-600 mb-4'>
							My Love 💖
						</h2>
						<p className='text-gray-700 leading-relaxed'>
							I'm really happy you said yes 🥹💘
							<br />
							<br />
							You make my world brighter, my days sweeter, and my heart lighter.
							I can't wait to spend this Valentine and many more with you 😌✨
						</p>
						<div className='mt-6 text-4xl'>💖💍💖</div>
					</motion.div>
				)}
			</motion.div>
		</motion.div>
	);
}
