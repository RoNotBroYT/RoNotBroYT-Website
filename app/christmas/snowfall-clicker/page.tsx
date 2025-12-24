"use client";
import { useEffect, useRef, useState } from "react";
import { Snowflake } from "lucide-react";

interface Snow {
  id: number;
  x: number;
  y: number;
  speed: number;
}

export default function SnowfallClicker() {
  const [snows, setSnows] = useState<Snow[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number | null>(null);
  const [intervalMs, setIntervalMs] = useState(1200);
  const [gameActive, setGameActive] = useState(true);
  const [missed, setMissed] = useState(0);
  const snowId = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("snowfallClickerHighScore");
    if (stored) setHighScore(Number(stored));
  }, []);

  useEffect(() => {
    if (!gameActive) return;
    const interval = setInterval(() => {
      setSnows((prev) => [
        ...prev,
        {
          id: snowId.current++,
          x: Math.random() * 90, // percent
          y: 0,
          speed: 1 + Math.random() * (score / 10 + 1),
        },
      ]);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs, gameActive, score]);

  useEffect(() => {
    if (!gameActive) return;
    const move = setInterval(() => {
      setSnows((prev) => {
        const next = prev.map((s) => ({ ...s, y: s.y + s.speed }));
        const missedNow = next.filter((s) => s.y >= 100).length;
        if (missedNow > 0) setMissed((m) => m + missedNow);
        return next.filter((s) => s.y < 100);
      });
    }, 30);
    return () => clearInterval(move);
  }, [gameActive]);

  useEffect(() => {
    if (score > 0 && score % 25 === 0 && intervalMs > 800) {
      setIntervalMs((ms) => Math.max(800, ms - 100));
    }
  }, [score, intervalMs]);

  useEffect(() => {
    if (missed >= 100) {
      setGameActive(false);
      if (highScore === null || score > highScore) {
        setHighScore(score);
        localStorage.setItem("snowfallClickerHighScore", String(score));
      }
    }
  }, [missed, score, highScore]);

  function handleClick(id: number) {
    setSnows((prev) => prev.filter((s) => s.id !== id));
    setScore((s) => s + 1);
  }

  function restart() {
    setSnows([]);
    setScore(0);
    setMissed(0);
    setIntervalMs(1200);
    setGameActive(true);
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">Snowfall Clicker</h2>
      <div className="flex gap-6 mb-4">
        <div className="text-sm text-blue-600 dark:text-blue-300">High Score: {highScore !== null ? highScore : "-"}</div>
        <div className="text-sm text-zinc-500">Score: {score}</div>
        <div className="text-sm text-red-500">Missed: {missed}/100</div>
      </div>
      <div
        ref={gameAreaRef}
        className="relative bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg w-[340px] h-[480px] overflow-hidden select-none"
      >
        {snows.map((snow) => (
          <button
            key={snow.id}
            onClick={() => handleClick(snow.id)}
            className="absolute"
            style={{ left: `${snow.x}%`, top: `${snow.y}%` }}
            tabIndex={-1}
            aria-label="Snowflake"
          >
            <Snowflake className="w-12 h-12 text-blue-400 drop-shadow" />
          </button>
        ))}
        {!gameActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-blue-950/80 z-10">
            <div className="text-lg font-semibold text-pink-600 mb-2">Game Over!<br/>You missed 100 snowflakes.</div>
            <button
              onClick={restart}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 mt-2"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-zinc-500 text-sm text-center max-w-xs">Tap or click the snowflakes before they reach the bottom. The game gets harder as you score more!</p>
    </div>
  );
}
