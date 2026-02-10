'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import image_2 from '@/public/image/2.jpeg';
import image_1 from '@/public/image/1.jpeg';
import image_3 from '@/public/image/3.jpeg';
import image_4 from '@/public/image/4.jpeg';
const romantic = new URL('./sounds/romantic.mp3', import.meta.url).href;
const yesSound = new URL('./sounds/Carry-Me-Dey-Go.mp3', import.meta.url).href;

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
	new URL('./sounds/Apostle-Would-Hear-Of-This.mp3', import.meta.url).href,
	new URL('./sounds/Adult-Laugh.mp3', import.meta.url).href,
	new URL('./sounds/70-years-old-man.mp3', import.meta.url).href,
];

const loveCards = [
	{ image: image_1, text: 'I love your smile 😍' },
	{ image: image_2, text: 'You inspire me everyday ✨' },
	{ image: image_3, text: 'Your kindness melts my heart 🥹' },
	{ image: image_4, text: 'You make my bad days better 💖' },
	{ image: image_1, text: 'You are my safe place 🏡' },
	{ image: image_2, text: 'Life feels easier with you ❤️' },
	{ image: image_3, text: 'You understand me deeply 💫' },
	{ image: image_4, text: 'You make me laugh endlessly 😂' },
	{ image: image_1, text: 'You bring me peace 🕊️' },
	{ image: image_2, text: 'You are my forever 💍' },
];

export default function ValentinePage() {
	const [step, setStep] = useState(0);
	const [accepted, setAccepted] = useState(false);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [soundEnabled, setSoundEnabled] = useState(false);
	const [pos, setPos] = useState({ x: '50%', y: '50%' });
	const [showReplyModal, setShowReplyModal] = useState(false);
	const [replyMessage, setReplyMessage] = useState('');

	const YOUR_WHATSAPP_NUMBER = '2349042542863';

	const memeRef = useRef<HTMLAudioElement | null>(null);
	const yesRef = useRef<HTMLAudioElement | null>(null);
	const bgRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		setDimensions({ width: window.innerWidth, height: window.innerHeight });
		const resize = () =>
			setDimensions({ width: window.innerWidth, height: window.innerHeight });
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	}, []);

	function enableSound() {
		if (!bgRef.current) return;
		bgRef.current.volume = 0.6;
		bgRef.current.play().catch(() => {});
		setSoundEnabled(true);
	}

	function nextStep() {
		setStep((s) => Math.min(s + 1, 10));
	}

	function moveNoButton() {
		const container = document.getElementById('no-btn-container');
		const button = document.getElementById('no-btn');
		if (!container || !button) return;

		const c = container.getBoundingClientRect();
		const b = button.getBoundingClientRect();

		const x = Math.random() * (c.width - b.width);
		const y = Math.random() * (c.height - b.height);

		setPos({ x: `${x}px`, y: `${y}px` });

		// 🔊 PLAY RANDOM MEME SOUND
		if (memeRef.current) {
			const sound = memeSounds[Math.floor(Math.random() * memeSounds.length)];

			memeRef.current.pause();
			memeRef.current.src = sound;
			memeRef.current.currentTime = 0;

			memeRef.current.play().catch(() => {});
		}
	}

	function handleYes() {
		setAccepted(true);
		bgRef.current?.pause();
		yesRef.current?.play().catch(() => {});
	}

	function openReplyModal() {
		setShowReplyModal(true);
	}

	function closeReplyModal() {
		setShowReplyModal(false);
		setReplyMessage('');
	}

	function sendToWhatsApp() {
		if (!replyMessage.trim()) {
			alert('Please write a message first! 💕');
			return;
		}

		// Format the message for WhatsApp
		const message = encodeURIComponent(
			`💕 Valentine's Proposal Reply 💕\n\n${replyMessage}`,
		);

		// Create WhatsApp URL
		const whatsappUrl = `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${message}`;

		// Open WhatsApp in new tab
		window.open(whatsappUrl, '_blank');

		// Close modal and show thank you
		closeReplyModal();
		alert('Thank you my love! 💖 Opening WhatsApp...');
	}

	return (
		<div className='relative min-h-screen overflow-hidden bg-linear-to-br from-pink-300 via-red-300 to-rose-400'>
			<audio
				ref={memeRef}
				preload='auto'
			/>
			<audio
				ref={yesRef}
				src={yesSound}
			/>
			<audio
				ref={bgRef}
				src={romantic}
				loop
			/>

			{/* SOUND UNLOCK */}
			{!soundEnabled && (
				<div className='fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center'>
					<button
						onClick={enableSound}
						className='px-12 py-6 bg-pink-500 text-white rounded-3xl text-2xl font-bold animate-pulse'>
						💖 Tap to start 💖
					</button>
				</div>
			)}

			{/* REPLY MODAL */}
			{showReplyModal && (
				<div className='fixed inset-0 z-[9998] bg-black/70 flex items-center justify-center p-4'>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className='bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl'>
						<h2 className='text-2xl font-bold text-pink-600 mb-4 text-center'>
							Send me your reply 💌
						</h2>
						<textarea
							value={replyMessage}
							onChange={(e) => setReplyMessage(e.target.value)}
							placeholder='Type your sweet message here...'
							className='w-full h-40 p-4 border-2 border-pink-300 rounded-2xl resize-none focus:outline-none focus:border-pink-500 text-gray-800'
							autoFocus
						/>
						<div className='flex gap-4 mt-6'>
							<button
								onClick={closeReplyModal}
								className='text-sm h-12 px-6 py-3 bg-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-400 transition'>
								Cancel
							</button>
							<button
								onClick={sendToWhatsApp}
								className=' w-full h-12 text-[14px] px-2 py-3 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 transition shadow-lg'>
								Send to WhatsApp
							</button>
						</div>
					</motion.div>
				</div>
			)}

			{accepted && (
				<Confetti
					width={dimensions.width}
					height={dimensions.height}
				/>
			)}

			<AnimatePresence mode='wait'>
				{/* LOVE CARDS */}
				{step < 10 && (
					<motion.div
						key={step}
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '-100%' }}
						transition={{ duration: 0.6, ease: 'easeInOut' }}
						drag='y'
						dragConstraints={{ top: 0, bottom: 0 }}
						onDragEnd={(e, info) => {
							if (info.offset.y < -120) nextStep();
						}}
						className='absolute inset-0 flex items-center justify-center'>
						<div
							className='absolute inset-0 object-cover bg-cover bg-center'
							style={{ backgroundImage: `url(${loveCards[step].image.src})` }}
						/>
						<div className='absolute inset-0 bg-black/40' />

						<h1 className='relative z-10 text-white text-4xl font-bold text-center px-6 drop-shadow-lg'>
							{loveCards[step].text}
						</h1>

						<div className='absolute bottom-30 text-white text-sm animate-bounce'>
							⬆ Swipe up
						</div>
					</motion.div>
				)}

				{/* PROPOSAL */}
				{step === 10 && (
					<motion.div
						key='proposal'
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className='flex items-center justify-center min-h-screen'>
						{!accepted ? (
							<div className='bg-white/90 p-10 rounded-3xl shadow-2xl text-center max-w-md'>
								<h1 className='text-2xl font-bold text-pink-600 mb-6'>
									Dear Morenikeji, Will you be my Valentine? 💘
								</h1>

								<div
									id='no-btn-container'
									className=' h-32 flex flex-col justify-center'>
									<motion.button
										id='no-btn'
										onClick={moveNoButton}
										style={{ left: pos.x, top: pos.y }}
										animate={{ left: pos.x, top: pos.y }}
										className='absolute w-1/2 h-20 px-6 py-3 bg-gray-300 rounded-2xl font-bold'>
										No 😈
									</motion.button>
									<button
										onClick={handleYes}
										className='px-6 w-full h-20 py-3 bg-pink-500 text-white rounded-2xl font-bold shadow-lg'>
										Yes 💕
									</button>
								</div>
							</div>
						) : (
							<motion.div
								initial={{ scale: 0.6, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								className='bg-white/90 p-12 rounded-3xl shadow-2xl text-center max-w-md'>
								<h1 className='text-2xl font-extrabold text-pink-600 mb-4'>
									Yayyyyy 💖💘
								</h1>
								<p className='text-xl text-slate-950'>
									I'm so happy you said yes! I promise to always make you smile
									and fill your life with love. I can't wait to create beautiful
									memories together. You are my everything, and I love you more
									than words can express. Here's to us and our amazing journey
									ahead! Cheers to unending love, laughter, and happily ever
									after!
								</p>
								<button
									onClick={openReplyModal}
									className='px-6 py-3 bg-pink-500 text-white rounded-2xl font-bold shadow-lg mt-4 hover:bg-pink-600 transition'>
									Want to Reply? Send me a message! 💌
								</button>
								<button
									className='px-6 py-3  text-black rounded-2xl font-medium  mt-4 transition'
									onClick={() => window.location.reload()}>
									Start All Over
								</button>
							</motion.div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
