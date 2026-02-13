"use client";

import { useState, useCallback } from "react";
import { Category } from "@/lib/types";
import { ResourceCard } from "@/components/ResourceCard";
import { AdBanner, InFeedAd } from "@/components/AdBanner";
import { Star, Filter, ChevronDown, ChevronRight, ArrowUp } from "lucide-react";

interface CategoryContentProps {
  category: Category;
}

const ITEMS_PER_PAGE = 20;

export function CategoryContent({ category }: CategoryContentProps) {
  const [starredOnly, setStarredOnly] = useState(false);
  const [expandedSubs, setExpandedSubs] = useState<Record<string, number>>({});
  const [collapsedSubs, setCollapsedSubs] = useState<Record<string, boolean>>({});

  const totalResources = category.subcategories.reduce(
    (sum, sub) => sum + sub.resources.length,
    0
  );
  const starredCount = category.subcategories.reduce(
    (sum, sub) => sum + sub.resources.filter((r) => r.starred).length,
    0
  );

  const getVisibleCount = useCallback(
    (subId: string) => expandedSubs[subId] || ITEMS_PER_PAGE,
    [expandedSubs]
  );

  const showMore = useCallback((subId: string) => {
    setExpandedSubs((prev) => ({
      ...prev,
      [subId]: (prev[subId] || ITEMS_PER_PAGE) + ITEMS_PER_PAGE,
    }));
  }, []);

  const toggleCollapse = useCallback((subId: string) => {
    setCollapsedSubs((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  }, []);

  return (
    <>
      {/* Quick nav */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setStarredOnly(!starredOnly)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            starredOnly
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              : "bg-card border border-border hover:border-amber-500/30 text-muted hover:text-amber-400"
          }`}
        >
          <Star size={12} className={starredOnly ? "fill-amber-400" : ""} />
          おすすめのみ ({starredCount})
        </button>
        <span className="text-xs text-muted">
          <Filter size={12} className="inline mr-1" />
          {starredOnly ? starredCount : totalResources} リソース表示中
        </span>
      </div>

      {/* Subcategory nav */}
      <div className="mb-8 flex flex-wrap gap-2">
        {category.subcategories.map((sub) => {
          const count = starredOnly
            ? sub.resources.filter((r) => r.starred).length
            : sub.resources.length;
          if (count === 0) return null;
          return (
            <a
              key={sub.id}
              href={`#${sub.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-card border border-border hover:border-accent/30 hover:text-accent transition-all"
            >
              {sub.title}
              <span className="text-[10px] text-muted">({count})</span>
            </a>
          );
        })}
      </div>

      {/* Subcategories */}
      <div className="space-y-10">
        {category.subcategories.map((sub, i) => {
          const filteredResources = starredOnly
            ? sub.resources.filter((r) => r.starred)
            : sub.resources;

          if (filteredResources.length === 0) return null;

          const visibleCount = getVisibleCount(sub.id);
          const visibleResources = filteredResources.slice(0, visibleCount);
          const remaining = filteredResources.length - visibleCount;

          const isCollapsed = collapsedSubs[sub.id] ?? false;

          return (
            <section
              key={sub.id}
              id={sub.id}
              className="scroll-mt-20"
            >
              <button
                onClick={() => toggleCollapse(sub.id)}
                className="mb-4 w-full text-left group"
              >
                <div className="flex items-center gap-2">
                  <ChevronRight
                    size={16}
                    className={`text-muted transition-transform duration-200 ${isCollapsed ? "" : "rotate-90"}`}
                  />
                  <h2 className="text-xl font-bold group-hover:text-accent transition-colors">{sub.title}</h2>
                  <span className="text-xs text-muted px-2 py-0.5 rounded-full bg-card border border-border">
                    {filteredResources.length}
                  </span>
                </div>
                {!isCollapsed && sub.description && (
                  <p className="mt-1 ml-6 text-sm text-muted">{sub.description}</p>
                )}
                {!isCollapsed && sub.note && (
                  <div className="mt-2 ml-6 p-3 rounded-lg bg-accent/5 border border-accent/10 text-xs text-muted leading-relaxed">
                    {sub.note}
                  </div>
                )}
              </button>

              {!isCollapsed && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {visibleResources.map((resource) => (
                      <ResourceCard key={resource.name + resource.url} resource={resource} />
                    ))}
                  </div>

                  {remaining > 0 && (
                    <button
                      onClick={() => showMore(sub.id)}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 text-sm text-muted hover:text-accent transition-all"
                    >
                      <ChevronDown size={16} />
                      もっと見る（残り {remaining}件）
                    </button>
                  )}

                  {visibleCount > ITEMS_PER_PAGE && (
                    <button
                      onClick={() => {
                        const el = document.getElementById(sub.id);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-3 flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors ml-auto"
                    >
                      <ArrowUp size={12} />
                      セクション先頭に戻る
                    </button>
                  )}
                </>
              )}

              {i === 1 && <AdBanner className="mt-6" />}
              {i === 5 && <InFeedAd className="mt-6" />}
              {i === 10 && <AdBanner className="mt-6" />}
            </section>
          );
        })}
      </div>
    </>
  );
}
