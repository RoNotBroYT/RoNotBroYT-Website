"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChristmasCountdown } from "@/components/christmas-countdown";
import { Youtube, Github, Twitter } from "lucide-react";

// Replace with your YouTube API key and Channel ID
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "YOUR_API_KEY";
const CHANNEL_ID = "UCJBs52aMCadMm_dxJ2b4k0w";

function useLatestVideos() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=2&type=video`
      );
      const data = await res.json();
      setVideos(data.items || []);
    }
    fetchVideos();
  }, []);
  return videos;
}

export default function Home() {
  const videos = useLatestVideos();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-20 px-6 bg-white dark:bg-black sm:items-center">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-2 text-center">
          Welcome to RoNotBroYT's Official Website
        </h1>
        <ChristmasCountdown />
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-xl">
          Discover my latest videos, projects, and connect with me online. Stay tuned for new content!
        </p>
        <section className="w-full mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50 text-center">Latest Videos</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {videos.length === 0 ? (
              <p className="text-zinc-400">Loading videos...</p>
            ) : (
              videos.map((video: any) => (
                <a
                  key={video.id.videoId}
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener"
                  className="block w-full max-w-xs rounded-lg shadow-lg bg-zinc-100 dark:bg-zinc-900 hover:scale-105 transition-transform"
                >
                  <Image
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    width={320}
                    height={180}
                    className="rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black dark:text-zinc-50 mb-2">
                      {video.snippet.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {video.snippet.description.substring(0, 80)}...
                    </p>
                  </div>
                </a>
              ))
            )}
          </div>
          <div className="flex justify-center mt-6">
            <a
              href="https://youtube.com/@RoNotBroYT"
              target="_blank"
              rel="noopener"
              className="px-6 py-2 rounded-full bg-foreground text-background font-semibold hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
            >
              See More
            </a>
          </div>
        </section>
        <div className="flex gap-6 mb-8">
          <a
            href="https://youtube.com/@RoNotBroYT"
            target="_blank"
            rel="noopener"
            className="hover:scale-110 transition-transform text-red-600 dark:text-red-500"
          >
            <Youtube size={32} />
          </a>
          <a
            href="https://github.com/RoNotBroYT"
            target="_blank"
            rel="noopener"
            className="hover:scale-110 transition-transform text-gray-800 dark:text-gray-200"
          >
            <Github size={32} />
          </a>
          <a
            href="https://twitter.com/RoNotBroYT"
            target="_blank"
            rel="noopener"
            className="hover:scale-110 transition-transform text-blue-400 dark:text-blue-300"
          >
            <Twitter size={32} />
          </a>
        </div>
      </main>
    </div>
  );
}
