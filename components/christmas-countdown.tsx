"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

function getChristmasCountdown() {
  const now = new Date();
  const year = now.getMonth() === 11 && now.getDate() > 25 ? now.getFullYear() + 1 : now.getFullYear();
  const christmas = new Date(year, 11, 25, 0, 0, 0, 0);
  const diff = christmas.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const colors = [
  "bg-red-500 text-white",
  "bg-green-600 text-white",
  "bg-yellow-400 text-zinc-900",
  "bg-emerald-500 text-white"
];

export function ChristmasCountdown() {
  const [countdown, setCountdown] = useState(getChristmasCountdown());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCountdown(getChristmasCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const labels = ["Days", "Hours", "Minutes", "Seconds"];
  const values = [countdown.days, countdown.hours, countdown.minutes, countdown.seconds];

  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">Christmas Countdown</h2>
      <div className="flex gap-4">
        {values.map((value, i) => (
          <Card key={labels[i]} className={`flex flex-col items-center justify-center w-20 h-24 rounded-xl shadow-lg ${colors[i]}`}>
            <span className="text-3xl font-bold mb-1">{value}</span>
            <span className="text-xs font-semibold uppercase tracking-wide">{labels[i]}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
