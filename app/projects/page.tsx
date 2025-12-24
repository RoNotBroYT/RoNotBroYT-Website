"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Volleyball, CloudSun, Gamepad2 } from "lucide-react";

const projects = [
	{
		title: "Ro-Trades",
		description: "A platform for trading and investment insights.",
		link: "https://ro-trades.app",
		icon: <TrendingUp className="text-green-600" size={28} />,
	},
	{
		title: "Ro-Footy",
		description: "Football stats, scores, and more for fans and players.",
		link: "https://ro-footy.app",
		icon: <Volleyball className="text-red-600" size={28} />,
	},
	{
		title: "Ro-Weather",
		description: "Get the latest weather updates and forecasts instantly.",
		link: "https://ro-weather.vercel.app",
		icon: <CloudSun className="text-blue-500" size={28} />,
	},
	{
		title: "Ro-Games",
		description: "A collection of fun and challenging games to play online.",
		link: "https://ro-games.vercel.app",
		icon: <Gamepad2 className="text-purple-600" size={28} />,
	},
];

export default function ProjectsPage() {
	return (
		<div className="flex flex-col items-center py-12 gap-8">
			<h1 className="text-3xl font-bold mb-4">Projects</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
				{projects.map((project) => (
					<Card
						key={project.title}
						className="p-6 flex flex-col gap-4 items-start shadow-lg"
					>
						<div className="flex items-center gap-3 mb-2">
							{project.icon}
							<h2 className="text-xl font-semibold">{project.title}</h2>
						</div>
						<p className="text-zinc-600 dark:text-zinc-300 mb-4">
							{project.description}
						</p>
						<Button asChild variant="default">
							<a
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								View Project
							</a>
						</Button>
					</Card>
				))}
			</div>
		</div>
	);
}
