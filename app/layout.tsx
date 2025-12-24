import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Snowfall } from "@/components/snowfall";
import { Providers } from "@/components/providers";
import { UserStatus } from "@/components/ui/user-status";
import { MobileNav } from "@/components/mobile-nav";
import { Github } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoNotBroYT",
  description: "RoNotBroYT's official website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Snowfall />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <nav className="w-full flex items-center justify-between px-4 md:px-8 py-4 bg-zinc-100 dark:bg-zinc-900 shadow-md mb-8">
              <a
                href="/"
                className="text-xl md:text-2xl font-bold text-black dark:text-zinc-50"
              >
                RoNotBroYT
              </a>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex flex-1 justify-center">
                <div className="flex gap-4">
                  <Button variant="ghost" asChild>
                    <a href="/">Home</a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href="/about">About</a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href="/projects">Projects</a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href="/posts">Posts</a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href="/links">Links</a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href="/christmas">Christmas</a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href="/game">Game</a>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ModeToggle />
                <UserStatus />
                <MobileNav />
              </div>
            </nav>
            {children}
          </ThemeProvider>
        </Providers>
        {/* Sticky Footer */}
        <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-zinc-100 dark:bg-zinc-900 shadow-md border-t border-zinc-200 dark:border-zinc-800 z-40">
          <a
            href="https://youtube.com/@RoNotBroYT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-black dark:text-zinc-50 hover:text-red-600 dark:hover:text-red-500 transition-colors"
          >
          by RoNotBroYT
          </a>
          <a
            href="https://github.com/RoNotBroYT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            <Github size={24} />
          </a>
        </footer>
      </body>
    </html>
  );
}