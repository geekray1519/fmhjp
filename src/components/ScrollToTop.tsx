"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Math.min(window.scrollY / scrollHeight, 1));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle dimensions
  const size = 48;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 group transition-all duration-300 hover:-translate-y-1 ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-75 pointer-events-none"
      }`}
      aria-label="ページトップに戻る"
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Progress ring */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-border"
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-accent transition-[stroke-dashoffset] duration-150"
          />
        </svg>
        {/* Center button */}
        <div className="absolute inset-[4px] rounded-full bg-accent text-white shadow-lg shadow-accent/25 group-hover:shadow-accent/40 flex items-center justify-center transition-shadow">
          <ArrowUp size={18} />
        </div>
      </div>
    </button>
  );
}
