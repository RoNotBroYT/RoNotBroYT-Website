"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const questions = [
	{
		question: "What color are mistletoe berries?",
		options: ["Red", "White", "Green", "Blue"],
		answer: 1,
	},
	{
		question:
			"Which country started the tradition of putting up a Christmas tree?",
		options: ["Germany", "USA", "England", "France"],
		answer: 0,
	},
	{
		question: "What is Frosty the Snowman's nose made out of?",
		options: ["Carrot", "Button", "Coal", "Stick"],
		answer: 1,
	},
	{
		question: "Which reindeer has a red nose?",
		options: ["Dasher", "Rudolph", "Vixen", "Comet"],
		answer: 1,
	},
	{
		question:
			"What do people traditionally put on top of a Christmas tree?",
		options: ["Star", "Angel", "Bell", "Candle"],
		answer: 1,
	},
	{
		question:
			"Which popular Christmas beverage is also called 'milk punch'?",
		options: [
			"Eggnog",
			"Hot Chocolate",
			"Mulled Wine",
			"Apple Cider",
		],
		answer: 0,
	},
	{
		question: "In the song 'Jingle Bells', what kind of sleigh is mentioned?",
		options: [
			"One-horse open sleigh",
			"Two-horse closed sleigh",
			"Reindeer sleigh",
			"Santa's sleigh",
		],
		answer: 0,
	},
	{
		question: "What is the name of the Grinch's dog?",
		options: ["Max", "Sam", "Buddy", "Charlie"],
		answer: 0,
	},
	{
		question:
			"Which country is credited with the creation of eggnog?",
		options: ["England", "USA", "Germany", "Canada"],
		answer: 0,
	},
	{
		question:
			"What is the best-selling Christmas single of all time?",
		options: [
			"White Christmas",
			"Jingle Bells",
			"All I Want for Christmas Is You",
			"Silent Night",
		],
		answer: 0,
	},
];

export default function ChristmasQuiz() {
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [score, setScore] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [showCorrect, setShowCorrect] = useState(false);

	function handleOption(idx: number) {
		setSelected(idx);
		setShowCorrect(true);
		if (idx === questions[current].answer) {
			setScore((s) => s + 1);
		}
	}

	function handleNext() {
		if (current + 1 < questions.length) {
			setCurrent((c) => c + 1);
			setSelected(null);
			setShowCorrect(false);
		} else {
			setShowResult(true);
		}
	}

	function restart() {
		setCurrent(0);
		setSelected(null);
		setScore(0);
		setShowResult(false);
		setShowCorrect(false);
	}

	return (
		<div className="flex flex-col items-center mt-8">
			<h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
				Christmas Quiz
			</h2>
			{showResult ? (
				<div className="flex flex-col items-center">
					<div className="text-lg font-semibold mb-2 text-pink-600">
						You scored {score} out of {questions.length}!
					</div>
					<Button onClick={restart} className="mt-2">
						Play Again
					</Button>
				</div>
			) : (
				<div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
					<div className="mb-4 text-lg font-medium">
						{questions[current].question}
					</div>
					<div className="flex flex-col gap-3">
						{questions[current].options.map((opt, idx) => {
							let btnClass = "";
							if (showCorrect && selected !== null) {
								if (idx === questions[current].answer)
									btnClass = "bg-green-500 text-white";
								else if (idx === selected)
									btnClass = "bg-red-500 text-white";
							}
							return (
								<Button
									key={opt}
									variant={selected === idx ? "default" : "outline"}
									className={btnClass}
									onClick={() => handleOption(idx)}
									disabled={selected !== null}
								>
									{opt}
								</Button>
							);
						})}
					</div>
					<Button
						onClick={handleNext}
						className="mt-6 w-full"
						disabled={selected === null}
					>
						{current + 1 === questions.length ? "Finish" : "Next"}
					</Button>
				</div>
			)}
		</div>
	);
}
