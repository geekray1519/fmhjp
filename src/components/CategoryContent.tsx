"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Category } from "@/lib/types";
import { ResourceCard } from "@/components/ResourceCard";
import { AdBanner, InFeedAd } from "@/components/AdBanner";
import { Star, Filter, ChevronDown, ChevronRight, ArrowUp, Search } from "lucide-react";

interface CategoryContentProps {
  category: Category;
}

const ITEMS_PER_PAGE = 20;

export function CategoryContent({ category }: CategoryContentProps) {
  const [starredOnly, setStarredOnly] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [expandedSubs, setExpandedSubs] = useState<Record<string, number>>({});
  const [collapsedSubs, setCollapsedSubs] = useState<Record<string, boolean>>({});
  const [activeSubId, setActiveSubId] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 200);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  const normalizedQuery = debouncedSearchText.trim().toLocaleLowerCase();

  const filterResources = useCallback(
    (sub: Category["subcategories"][number]) => {
      return sub.resources.filter((resource) => {
        if (starredOnly && !resource.starred) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        const name = resource.name.toLocaleLowerCase();
        const description = resource.description.toLocaleLowerCase();

        return name.includes(normalizedQuery) || description.includes(normalizedQuery);
      });
    },
    [normalizedQuery, starredOnly]
  );

  const visibleSubcategories = useMemo(
    () =>
      category.subcategories
        .map((sub) => ({
          id: sub.id,
          title: sub.title,
          count: filterResources(sub).length,
        }))
        .filter((sub) => sub.count > 0),
    [category.subcategories, filterResources]
  );

  useEffect(() => {
    if (visibleSubcategories.length === 0) {
      setActiveSubId("");
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-toc-section='true']")
    );

    if (sections.length === 0) {
      setActiveSubId(visibleSubcategories[0].id);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (activeEntries.length > 0) {
          setActiveSubId(activeEntries[0].target.id);
          return;
        }

        const nearest = sections.find((section) => section.getBoundingClientRect().top >= 0);
        setActiveSubId(nearest?.id ?? sections[sections.length - 1].id);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    setActiveSubId(sections[0].id);

    return () => observer.disconnect();
  }, [visibleSubcategories]);

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

  const shownResourceCount = category.subcategories.reduce(
    (sum, sub) => sum + filterResources(sub).length,
    0
  );

  return (
    <div className="lg:flex lg:items-start lg:gap-8">
      <div className="flex-1 min-w-0">
        <div className="mb-4 search-glow">
          <label htmlFor="resource-search" className="sr-only">
            リソース検索
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="resource-search"
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="リソース名・説明で検索"
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-accent/40"
            />
          </div>
        </div>

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
          <span className="text-xs text-muted" aria-live="polite" aria-atomic="true">
            <Filter size={12} className="inline mr-1" />
            {shownResourceCount} リソース表示中
          </span>
        </div>

        {/* Subcategory nav */}
        <div className="mb-8 flex flex-wrap gap-2">
          {visibleSubcategories.map((sub) => (
            <a
              key={sub.id}
              href={`#${sub.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-card border border-border hover:border-accent/30 hover:text-accent transition-all"
            >
              {sub.title}
              <span className="text-[10px] text-muted">({sub.count})</span>
            </a>
          ))}
        </div>

        {/* Subcategories */}
        <div className="space-y-10">
          {category.subcategories.map((sub, i) => {
            const filteredResources = filterResources(sub);

            if (filteredResources.length === 0) return null;

            const visibleCount = getVisibleCount(sub.id);
            const visibleResources = filteredResources.slice(0, visibleCount);
            const remaining = filteredResources.length - visibleCount;

            const isCollapsed = collapsedSubs[sub.id] ?? false;

            return (
              <section
                key={sub.id}
                id={sub.id}
                data-toc-section="true"
                className="scroll-mt-20"
              >
                <button
                  onClick={() => toggleCollapse(sub.id)}
                  className="mb-4 w-full text-left group"
                  aria-expanded={!isCollapsed}
                  aria-controls={`content-${sub.id}`}
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
                  <div id={`content-${sub.id}`} role="region" aria-label={sub.title}>
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
                  </div>
                )}

                {i === 1 && <AdBanner className="mt-6" />}
                {i === 5 && <InFeedAd className="mt-6" />}
                {i === 10 && <AdBanner className="mt-6" />}
              </section>
            );
          })}
        </div>

        {shownResourceCount === 0 && (
          <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted">
            条件に一致するリソースが見つかりませんでした。
          </div>
        )}
      </div>

      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24 rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold tracking-wide text-muted mb-3">目次</p>
          <nav className="space-y-1">
            {visibleSubcategories.map((sub) => (
              <a
                key={sub.id}
                href={`#${sub.id}`}
                className={`toc-item flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-muted ${
                  activeSubId === sub.id ? "toc-active" : ""
                }`}
              >
                <span className="truncate">{sub.title}</span>
                <span className="text-[10px] text-muted">{sub.count}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
