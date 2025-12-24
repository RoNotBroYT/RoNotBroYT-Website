"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Gift, Snowflake, Candy, TreePine, Bell, Star, CandyCane, IceCream, Cookie, CakeSlice, Croissant, CloudSnow, Coffee, Milk, Bomb, CalendarDays, Lollipop, Heart } from "lucide-react";

const icons = [
	<Gift className="w-8 h-8 text-red-500" />,
	<Snowflake className="w-8 h-8 text-blue-500" />,
	<Candy className="w-8 h-8 text-pink-500" />,
	<TreePine className="w-8 h-8 text-green-600" />,
	<Bell className="w-8 h-8 text-yellow-500" />,
	<Star className="w-8 h-8 text-yellow-400" />,
	<CandyCane className="w-8 h-8 text-red-400" />,
	<IceCream className="w-8 h-8 text-pink-300" />,
	<Cookie className="w-8 h-8 text-yellow-700" />,
	<CakeSlice className="w-8 h-8 text-purple-400" />,
	<Croissant className="w-8 h-8 text-orange-400" />,
	<CloudSnow className="w-8 h-8 text-sky-400" />,
	<Coffee className="w-8 h-8 text-amber-900" />,
	<Milk className="w-8 h-8 text-blue-200" />,
	<Bomb className="w-8 h-8 text-black" />,
	<CalendarDays className="w-8 h-8 text-blue-700" />,
	<Lollipop className="w-8 h-8 text-pink-500" />,
	<Heart className="w-8 h-8 text-red-400" />,
];

function shuffle(array: any[]) {
	let arr = array.slice();
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

const makeDeck = () =>
	shuffle([...icons, ...icons]).map((icon, i) => ({
		icon,
		id: i,
		matched: false,
	}));

export default function MemoryMatchGame() {
	const [deck, setDeck] = useState(makeDeck());
	const [flipped, setFlipped] = useState<number[]>([]);
	const [matched, setMatched] = useState<number[]>([]);
	const [moves, setMoves] = useState(0);
	const [won, setWon] = useState(false);
	const [highScore, setHighScore] = useState<number | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem("memoryMatchHighScore");
		if (stored) setHighScore(Number(stored));
	}, []);

	useEffect(() => {
		if (flipped.length === 2) {
			setMoves((m) => m + 1);
			const [i1, i2] = flipped;
			if (deck[i1].icon.type === deck[i2].icon.type) {
				setMatched((prev) => [...prev, i1, i2]);
				setTimeout(() => setFlipped([]), 800);
			} else {
				setTimeout(() => setFlipped([]), 1000);
			}
		}
	}, [flipped, deck]);

	useEffect(() => {
		if (matched.length === deck.length && deck.length > 0) {
			setWon(true);
			if (highScore === null || moves < highScore) {
				setHighScore(moves);
				localStorage.setItem("memoryMatchHighScore", String(moves));
			}
		}
	}, [matched, deck, moves, highScore]);

	function handleFlip(idx: number) {
		if (
			flipped.length < 2 &&
			!flipped.includes(idx) &&
			!matched.includes(idx)
		) {
			setFlipped([...flipped, idx]);
		}
	}

	function restart() {
		setDeck(makeDeck());
		setFlipped([]);
		setMatched([]);
		setMoves(0);
		setWon(false);
	}

	return (
		<div className="flex flex-col items-center gap-4 mt-8">
			<h2 className="text-2xl font-bold mb-2 text-green-700 dark:text-green-300">
				Christmas Memory Match
			</h2>
			<div className="grid grid-cols-6 gap-4">
				{deck.map((card, idx) => {
					const isFlipped = flipped.includes(idx) || matched.includes(idx);
					return (
						<Card
							key={card.id}
							className={`w-16 h-20 flex items-center justify-center cursor-pointer text-3xl select-none ${
								isFlipped
									? "bg-white dark:bg-zinc-800"
									: "bg-green-200 dark:bg-green-900"
							}`}
							onClick={() => handleFlip(idx)}
						>
							{isFlipped ? card.icon : <span className="">🎁</span>}
						</Card>
					);
				})}
			</div>
			<div className="flex items-center gap-4 mt-2">
				<div className={highScore !== null ? "text-sm text-emerald-600 dark:text-emerald-300" : "text-sm text-zinc-500 opacity-60"}>
					Best Score: {highScore !== null ? highScore : "-"} moves
				</div>
				<div className="text-sm text-zinc-500">Moves: {moves}</div>
			</div>
			{won && (
				<div className="mt-4 text-lg font-semibold text-pink-600">
					You matched all the cards!{" "}
					<button
						onClick={restart}
						className="ml-2"
						type="button"
						data-variant="ghost"
					>
						Play Again
					</button>
				</div>
			)}
		</div>
	);
}
