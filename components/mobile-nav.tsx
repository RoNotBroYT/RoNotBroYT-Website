"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-black dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
          />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-screen w-64 bg-zinc-100 dark:bg-zinc-900 shadow-lg z-50 md:hidden flex flex-col animate-in slide-in-from-left-full duration-300">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black dark:text-zinc-50">
                RoNotBroYT
              </h2>
              <button
                onClick={closeMenu}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
              <a
                href="/"
                onClick={closeMenu}
                className="px-4 py-2 rounded-lg text-black dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="/about"
                onClick={closeMenu}
                className="px-4 py-2 rounded-lg text-black dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="/projects"
                onClick={closeMenu}
                className="px-4 py-2 rounded-lg text-black dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-medium"
              >
                Projects
              </a>
              <a
                href="/posts"
                onClick={closeMenu}
                className="px-4 py-2 rounded-lg text-black dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-medium"
              >
                Posts
              </a>
              <a
                href="/links"
                onClick={closeMenu}
                className="px-4 py-2 rounded-lg text-black dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-medium"
              >
                Links
              </a>
              <a
                href="/christmas"
                onClick={closeMenu}
                className="px-4 py-2 rounded-lg text-black dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-medium"
              >
                Christmas
              </a>
              <a
                href="/game"
                onClick={closeMenu}
                className="px-4 py-2 rounded-lg text-black dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors font-medium"
              >
                Game
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
