"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import React from "react";

const sounds = [
	{ name: "Jingle Bell", src: "/sounds/jingle.mp3", emoji: "🔔" },
	{ name: "Ho Ho Ho", src: "/sounds/ho-ho-ho.mp3", emoji: "🎅" },
	{ name: "Sleigh Bells", src: "/sounds/sleigh-bells.mp3", emoji: "🛷" },
	{ name: "Chime", src: "/sounds/chime.mp3", emoji: "🎶" },
];

export default function MusicBox() {
	const [recording, setRecording] = useState(false);
	const [sequence, setSequence] = useState<string[]>([]);
	const [playing, setPlaying] = useState(false);
	const audioRefs = useRef(sounds.map(() => React.createRef<HTMLAudioElement>()));

	function playSound(idx: number) {
		const audio = audioRefs.current[idx].current;
		if (audio) {
			audio.currentTime = 0;
			audio.play();
		}
		if (recording) {
			setSequence((seq) => [...seq, sounds[idx].src]);
		}
	}

	function startRecording() {
		setSequence([]);
		setRecording(true);
	}

	function stopRecording() {
		setRecording(false);
		localStorage.setItem("musicBoxSequence", JSON.stringify(sequence));
	}

	async function playSequence() {
		setPlaying(true);
		const seq = JSON.parse(localStorage.getItem("musicBoxSequence") || "[]");
		for (let src of seq) {
			const idx = sounds.findIndex((s) => s.src === src);
			if (idx !== -1) {
				playSound(idx);
				await new Promise((res) => setTimeout(res, 600));
			}
		}
		setPlaying(false);
	}

	return (
		<div className="flex flex-col items-center mt-8">
			<h2 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-300">
				Holiday Music Box
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
				{sounds.map((sound, idx) => (
					<Button
						key={sound.name}
						onClick={() => playSound(idx)}
						disabled={playing}
						className="flex flex-col items-center justify-center h-24 w-24 text-3xl"
					>
						<span>{sound.emoji}</span>
						<span className="mt-2 text-base font-semibold">{sound.name}</span>
						<audio
							ref={audioRefs.current[idx]}
							src={sound.src}
							preload="auto"
						/>
					</Button>
				))}
			</div>
			<div className="flex gap-4 mb-2">
				{!recording ? (
					<Button onClick={startRecording} disabled={playing}>
						Record
					</Button>
				) : (
					<Button onClick={stopRecording} disabled={playing}>
						Stop
					</Button>
				)}
				<Button
					onClick={playSequence}
					disabled={playing || recording}
				>
					Play
				</Button>
			</div>
			<div className="text-sm text-zinc-500">
				Press the cards to play sounds, record a tune, and play it back!
			</div>
		</div>
	);
}
