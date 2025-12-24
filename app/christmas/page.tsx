import { Card } from "@/components/ui/card";
import { ChristmasCountdown } from "@/components/christmas-countdown";
import { Snowfall } from "@/components/snowfall";
import { Gamepad2, BookOpenCheck, Gift, Music2, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
	{
		title: "Memory Match Game",
		description: "Match all the Christmas cards!",
		icon: <Gamepad2 className="w-8 h-8 text-green-500" />,
		href: "/christmas/memory-match",
		internal: true,
	},
	{
		title: "Snowfall Clicker",
		description: "Click the snowflakes as they fall!",
		icon: <Snowflake className="w-8 h-8 text-blue-400" />,
		href: "/christmas/snowfall-clicker",
		internal: true,
	},
	{
		title: "Christmas Quiz",
		description: "Test your Christmas knowledge!",
		icon: <BookOpenCheck className="w-8 h-8 text-green-500" />,
		href: "/christmas/quiz",
		internal: true,
	},
	{
		title: "Find Santa",
		description: "Can you spot Santa among the crowd? 5 levels, each harder!",
		icon: <Gift className="w-8 h-8 text-red-500" />,
		href: "/christmas/find-santa",
		internal: true,
	},
	{
		title: "Holiday Music",
		description: "Create your own Christmas tune!",
		icon: <Music2 className="w-8 h-8 text-yellow-500" />,
		href: "/christmas/music-box",
		internal: true,
	},
];

export default function ChristmasPage() {
	return (
		<main className="flex flex-col items-center justify-center min-h-[70vh] gap-8 py-8">
			<h1 className="text-4xl font-bold text-center mb-4">
				Merry Christmas! 🎄
			</h1>
			<ChristmasCountdown />
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 w-full max-w-2xl">
				{links.map((link) => (
					<Card
						key={link.title}
						className="flex items-center gap-4 p-6 hover:shadow-lg transition-shadow"
					>
						<div>{link.icon}</div>
						<div className="flex-1">
							<h2 className="text-xl font-semibold mb-1">{link.title}</h2>
							<p className="text-zinc-600 dark:text-zinc-300 mb-2">
								{link.description}
							</p>
							{link.internal ? (
								<Button asChild variant="ghost">
									<a href={link.href}>Play</a>
								</Button>
							) : (
								<Button asChild variant="ghost">
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										Visit
									</a>
								</Button>
							)}
						</div>
					</Card>
				))}
			</div>
		</main>
	);
}
