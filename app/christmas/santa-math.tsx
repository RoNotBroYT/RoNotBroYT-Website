import { useState } from "react";
import { Calculator, Gift, Snowflake } from "lucide-react";
import { Card } from "@/components/ui/card";

const questions = [
  {
    question: "Santa has 8 reindeer. If 3 more join, how many reindeer does Santa have now?",
    answer: 11,
    icon: <Gift className="w-6 h-6 text-red-500" />,
  },
  {
    question: "There are 12 candy canes. If you eat 4, how many are left?",
    answer: 8,
    icon: <Snowflake className="w-6 h-6 text-blue-500" />,
  },
  {
    question: "Santa delivers 5 presents to each of 6 houses. How many presents in total?",
    answer: 30,
    icon: <Calculator className="w-6 h-6 text-green-500" />,
  },
];

export default function SantaMathGame() {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = questions[current];

  function checkAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (parseInt(input) === q.answer) {
      setCorrect(1);
      setScore(score + 1);
    } else {
      setCorrect(0);
    }
    setTimeout(() => {
      setCorrect(null);
      setInput("");
      setCurrent((prev) => (prev + 1) % questions.length);
    }, 1200);
  }

  return (
    <Card className="max-w-md mx-auto p-6 flex flex-col items-center gap-4 mt-8">
      <div className="flex items-center gap-2 mb-2">
        {q.icon}
        <span className="font-bold text-lg">Santa's Math Quiz</span>
      </div>
      <div className="text-center text-base mb-2">{q.question}</div>
      <form onSubmit={checkAnswer} className="flex gap-2 items-center">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded px-2 py-1 w-24 text-center"
          disabled={correct !== null}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          disabled={correct !== null}
        >
          Check
        </button>
      </form>
      {correct === 1 && <div className="text-green-600 font-semibold">Correct! 🎅</div>}
      {correct === 0 && <div className="text-red-500 font-semibold">Oops! Try the next one.</div>}
      <div className="mt-2 text-sm text-zinc-500">Score: {score}</div>
    </Card>
  );
}
