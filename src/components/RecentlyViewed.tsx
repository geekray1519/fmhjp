"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { History } from "lucide-react";
import { categories } from "@/data";

const STORAGE_KEY = "fmhjp-recently-viewed";
const MAX_RECENT = 6;

interface RecentItem {
  slug: string;
  timestamp: number;
}

export function trackCategoryView(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const items: RecentItem[] = stored ? JSON.parse(stored) : [];
    const filtered = items.filter((item) => item.slug !== slug);
    filtered.unshift({ slug, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_RECENT)));
  } catch {
    // localStorage unavailable
  }
}

export function RecentlyViewed() {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const items: RecentItem[] = JSON.parse(stored);
        setRecentSlugs(items.map((i) => i.slug));
      }
    } catch {
      // ignore
    }
  }, []);

  const recentCategories = recentSlugs
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean);

  if (recentCategories.length === 0) return null;

  return (
    <section className="pb-10">
      <div className="flex items-center gap-2 mb-4">
        <History size={20} className="text-accent" />
        <h2 className="text-xl font-bold">最近見たカテゴリ</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {recentCategories.map((cat) => {
          if (!cat) return null;
          const count = cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0);
          return (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group text-center p-4 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="text-xs font-medium group-hover:text-accent transition-colors truncate">
                {cat.title}
              </div>
              <div className="text-[10px] text-muted mt-1">
                {count.toLocaleString()} リソース
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
