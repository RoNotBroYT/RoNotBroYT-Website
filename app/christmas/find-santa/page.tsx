"use client";
import { useState, useEffect, useRef } from "react";
import { User, Gift } from "lucide-react";

const LEVELS = [20, 40, 60, 80, 100];
const COLORS: { [key: string]: string } = {
  "red": "#dc2626",
  "blue": "#2563eb",
  "green": "#16a34a",
  "yellow": "#ca8a04",
  "purple": "#9333ea",
  "orange": "#ea580c",
  "pink": "#ec4899",
  "teal": "#0d9488",
  "lime": "#65a30d",
  "indigo": "#4f46e5",
  "amber": "#b45309",
  "rose": "#e11d48",
  "cyan": "#0891b2",
  "violet": "#7c3aed",
  "fuchsia": "#d946ef",
  "emerald": "#059669",
  "brown": "#92400e"
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomColors(count: number, santaColor: string) {
  // Assign each person a unique color if possible, only repeat if all are used, never use Santa's color for others
  const colorKeys = Object.keys(COLORS).filter((c) => c !== santaColor);
  const chosen: string[] = [];
  const used: Set<string> = new Set();
  while (chosen.length < count - 1) {
    let color: string;
    if (used.size < colorKeys.length) {
      const unused = colorKeys.filter((c) => !used.has(c));
      color = unused[getRandomInt(unused.length)];
      used.add(color);
    } else {
      color = colorKeys[getRandomInt(colorKeys.length)];
    }
    chosen.push(color);
  }
  // Insert Santa at a random position
  const result = [...chosen];
  const santaPos = getRandomInt(count);
  result.splice(santaPos, 0, santaColor);
  return result;
}

export default function FindSantaGame() {
  const [level, setLevel] = useState(0);
  const [santaColor, setSantaColor] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [highScore, setHighScore] = useState<number | null>(null);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const colorKeys = Object.keys(COLORS);
    const newSanta = colorKeys[getRandomInt(colorKeys.length)];
    setSantaColor(newSanta);
    setColors(getRandomColors(LEVELS[level], newSanta));
    setPositions(Array.from({ length: LEVELS[level] }, () => ({ x: Math.random() * 90, y: Math.random() * 85 })));
    setTimer(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [level, mounted]);

  useEffect(() => {
    if (gameOver && timerRef.current) {
      clearInterval(timerRef.current);
      if (won && (highScore === null || timer < highScore)) {
        setHighScore(timer);
        localStorage.setItem("findSantaHighScore", String(timer));
      }
    }
  }, [gameOver, won, timer, highScore]);

  useEffect(() => {
    if (mounted && highScore === null) {
      const stored = localStorage.getItem("findSantaHighScore");
      if (stored) setHighScore(Number(stored));
    }
  }, [mounted, highScore]);

  // Animate positions
  useEffect(() => {
    if (!mounted || gameOver) return;
    let time = 0;
    const animate = () => {
      time += 0.016; // ~60fps
      setPositions((prev) =>
        prev.map((pos, i) => ({
          x: (pos.x + 0.01 * Math.sin(time * 0.5 + i)) % 90,
          y: (pos.y + 0.008 * Math.cos(time * 0.5 + i)) % 85
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mounted, gameOver]);

  function startLevel(lvl: number) {
    setLevel(lvl);
    setGameOver(false);
    setWon(false);
  }

  function handlePick(idx: number) {
    if (colors[idx] === santaColor) {
      if (level === LEVELS.length - 1) {
        setWon(true);
        setGameOver(true);
      } else {
        setLevel(level + 1);
      }
    } else {
      setGameOver(true);
    }
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-2 text-red-700 dark:text-red-300">Find Santa</h2>
      <div className="mb-4 text-lg">Level {level + 1} / {LEVELS.length}</div>
      <div className="mb-2 text-md">Santa's color: {mounted && santaColor ? (
        <span className="font-bold capitalize" style={{ color: COLORS[santaColor] }}>{santaColor}</span>
      ) : (
        <span className="font-bold capitalize">?</span>
      )}</div>
      <div className="flex gap-6 mb-4">
        <div className="text-sm text-blue-600 dark:text-blue-300">Best Time: {highScore !== null ? highScore + 's' : '-'}</div>
        <div className="text-sm text-zinc-500">Time: {timer}s</div>
      </div>
      <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-lg shadow p-6 relative" style={{ height: "400px" }}>
        {mounted && colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => handlePick(idx)}
            className="absolute hover:scale-110 transition-transform"
            style={{
              left: `${positions[idx]?.x || 0}%`,
              top: `${positions[idx]?.y || 0}%`,
              transform: "translate(-50%, -50%)",
              cursor: gameOver ? "not-allowed" : "pointer",
              opacity: gameOver ? 0.6 : 1
            }}
            disabled={gameOver}
            aria-label={color}
          >
            <User className="w-12 h-12" style={{ color: COLORS[color] }} />
          </button>
        ))}
      </div>
      {gameOver && (
        <div className="mt-4 text-lg font-semibold text-pink-600">
          {won ? (
            <>You found Santa on the last level! <Gift className="inline w-6 h-6 text-yellow-500 ml-1" /></>
          ) : (
            <>Oops! That wasn't Santa. <button onClick={() => startLevel(0)} className="ml-2 underline text-blue-600">Restart</button></>
          )}
        </div>
      )}
      {!gameOver && (
        <div className="text-sm text-zinc-500">Tap the person with Santa's color!</div>
      )}
    </div>
  );
}
