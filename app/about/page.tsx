"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { User, Eye, Video, Calendar, UserCircle, Code } from "lucide-react";

const CHANNEL_ID = "UCJBs52aMCadMm_dxJ2b4k0w";
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

async function fetchChannelStats() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`
  );
  const data = await res.json();
  const stats = data.items?.[0]?.statistics || {};
  const snippet = data.items?.[0]?.snippet || {};
  return {
    ...stats,
    publishedAt: snippet.publishedAt,
  };
}

function formatDate(dateString: string) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default function AboutPage() {
  const [stats, setStats] = useState({ viewCount: "-", subscriberCount: "-", videoCount: "-", publishedAt: "-" });

  useEffect(() => {
    fetchChannelStats().then(setStats);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h1 className="text-3xl font-bold mb-4">About RoNotBroYT</h1>
      <Card className="p-4 flex flex-col items-center w-full max-w-[320px] mb-6">
        <UserCircle className="mb-2 text-zinc-600 dark:text-zinc-300" size={60} />
        <h2 className="text-lg font-semibold mb-1">Who am I?</h2>
        <p className="text-center text-zinc-600 dark:text-zinc-300 text-sm">I'm RoNotBroYT, a passionate creator and developer sharing projects, games, and fun content on YouTube and beyond!</p>
      </Card>
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-4 gap-8">
        <Card className="p-6 flex flex-col items-center bg-gradient-to-br from-yellow-400/20 to-yellow-100/40 dark:from-yellow-700/30 dark:to-yellow-900/40">
          <User className="text-yellow-500 mb-2" size={32} />
          <span className="text-4xl font-bold text-yellow-500 mb-2 drop-shadow">{Number(stats.subscriberCount).toLocaleString()}</span>
          <span className="text-base font-medium text-zinc-700 dark:text-zinc-200">Subscribers</span>
        </Card>
        <Card className="p-6 flex flex-col items-center bg-gradient-to-br from-blue-400/20 to-blue-100/40 dark:from-blue-700/30 dark:to-blue-900/40">
          <Eye className="text-blue-500 mb-2" size={32} />
          <span className="text-4xl font-bold text-blue-500 mb-2 drop-shadow">{Number(stats.viewCount).toLocaleString()}</span>
          <span className="text-base font-medium text-zinc-700 dark:text-zinc-200">Total Views</span>
        </Card>
        <Card className="p-6 flex flex-col items-center bg-gradient-to-br from-green-400/20 to-green-100/40 dark:from-green-700/30 dark:to-green-900/40">
          <Video className="text-green-500 mb-2" size={32} />
          <span className="text-4xl font-bold text-green-500 mb-2 drop-shadow">{Number(stats.videoCount).toLocaleString()}</span>
          <span className="text-base font-medium text-zinc-700 dark:text-zinc-200">Videos</span>
        </Card>
        <Card className="p-6 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-400/20 to-zinc-100/40 dark:from-zinc-700/30 dark:to-zinc-900/40">
          <Calendar className="text-zinc-500 mb-2" size={24} />
          <span className="text-base font-medium text-zinc-700 dark:text-zinc-200 mb-1 text-center w-full">Channel Created</span>
          <span className="text-base text-zinc-500 dark:text-zinc-400 text-center w-full">{formatDate(stats.publishedAt)}</span>
        </Card>
      </div>
      <Card className="p-6 flex flex-col items-center w-full max-w-[600px] bg-gradient-to-br from-purple-400/20 to-purple-100/40 dark:from-purple-700/30 dark:to-purple-900/40">
        <Code className="text-purple-500 mb-3" size={36} />
        <h2 className="text-xl font-semibold mb-3">What I Code With</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {["TypeScript", "React", "Next.js", "Tailwind CSS", "JavaScript", "HTML/CSS", "Node.js", "Python", "SQL"].map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-full bg-purple-200 dark:bg-purple-700 text-purple-900 dark:text-purple-100 text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
