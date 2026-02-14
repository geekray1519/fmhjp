"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface CategoryBreadcrumbProps {
  title: string;
  icon: string;
  /** Threshold in pixels from top where breadcrumb appears */
  threshold?: number;
}

/**
 * Sticky breadcrumb that appears below the header when the user scrolls past
 * the category hero section on category pages.
 */
export function CategoryBreadcrumb({ title, icon, threshold = 280 }: CategoryBreadcrumbProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-[54] transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="glass bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 h-9 text-xs">
          <Link
            href="/"
            className="text-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Home size={12} />
            <span className="hidden sm:inline">ホーム</span>
          </Link>
          <ChevronRight size={12} className="text-muted/50" />
          <span className="font-medium text-foreground flex items-center gap-1.5 truncate">
            <span>{icon}</span>
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}
