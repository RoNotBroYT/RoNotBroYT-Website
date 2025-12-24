"use client";

import { Button } from "@/components/ui/button";
import { Mail, Youtube, Music3, Github, Twitter } from "lucide-react";

interface Link {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const links: Link[] = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@RoNotBroYT",
    icon: <Youtube className="w-6 h-6" />,
    color: "bg-red-600 hover:bg-red-700",
    description: "Watch my latest videos",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@squiggleyt22",
    icon: <Music3 className="w-6 h-6" />,
    color: "bg-black hover:bg-zinc-800",
    description: "Short-form content",
  },
  {
    name: "Twitter/X",
    url: "https://twitter.com/ronotbroyt",
    icon: <Twitter className="w-6 h-6" />,
    color: "bg-blue-400 hover:bg-blue-500",
    description: "Latest updates and announcements",
  },
  {
    name: "GitHub",
    url: "https://github.com/ronotbroyt",
    icon: <Github className="w-6 h-6" />,
    color: "bg-gray-800 hover:bg-gray-900",
    description: "Check out my open source projects",
  },
  {
    name: "Email",
    url: "mailto:contact@ronotbroyt.com",
    icon: <Mail className="w-6 h-6" />,
    color: "bg-purple-600 hover:bg-purple-700",
    description: "Get in touch with me",
  },
];

export default function LinksPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black py-20 px-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            My Links
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Connect with me on all my platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="h-full p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className={`${link.color} p-3 rounded-lg text-white transition-all`}>
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {link.description}
                    </p>
                  </div>
                  <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Or visit my Linktree for more
          </p>
          <a
            href="https://linktr.ee/ronotbroyt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg text-lg font-semibold transition-all hover:scale-105">
              Visit Linktree
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
