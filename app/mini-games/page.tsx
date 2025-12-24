import Link from "next/link";
import { Card } from "@/components/ui/card";

const games = [
  {
    name: "Memory Match",
    description: "Test your memory with a festive card matching game!",
    href: "/christmas/memory-match",
    emoji: "🧠"
  },
  // Add more games here as you build them
];

export default function MiniGamesPage() {
  return (
    <div className="flex flex-col items-center gap-8 mt-10">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-4">Mini Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link href={game.href} key={game.name}>
            <Card className="p-6 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-4xl mb-2">{game.emoji}</span>
              <div className="font-semibold text-lg mb-1">{game.name}</div>
              <div className="text-sm text-zinc-500 text-center">{game.description}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
