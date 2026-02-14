"use client";

import { useState, useEffect } from "react";

interface ReadingProgressBarProps {
  /** Accent color gradient classes (e.g. "from-indigo-500 to-purple-500") */
  color?: string;
}

export function ReadingProgressBar({ color }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Math.min((window.scrollY / scrollHeight) * 100, 100));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (progress < 1) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-[55] h-[2px] bg-border/30">
      <div
        className={`h-full transition-[width] duration-150 ease-out bg-gradient-to-r ${color || "from-accent via-purple-500 to-pink-500"}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
