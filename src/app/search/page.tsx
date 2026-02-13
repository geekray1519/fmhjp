"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data";
import { ResourceCard } from "@/components/ResourceCard";
import { SearchResult } from "@/lib/types";
import { Search, X, ChevronDown, Clock, Star, Filter } from "lucide-react";

const RESULTS_PER_PAGE = 50;

function SearchSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-5 w-48 bg-card rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-4 rounded bg-card-hover" />
              <div className="h-4 w-32 rounded bg-card-hover" />
            </div>
            <div className="h-3 w-full rounded bg-card-hover mt-2" />
            <div className="h-3 w-2/3 rounded bg-card-hover mt-1.5" />
            <div className="flex gap-2 mt-3">
              <div className="h-5 w-20 rounded-full bg-card-hover" />
              <div className="h-5 w-14 rounded-full bg-card-hover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);
  const [searchTime, setSearchTime] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [starredOnly, setStarredOnly] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (inputValue !== query) setIsSearching(true);
    debounceRef.current = setTimeout(() => {
      setQuery(inputValue);
      setVisibleCount(RESULTS_PER_PAGE);
      setIsSearching(false);
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputValue, query]);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const start = performance.now();
    const q = query.toLowerCase();
    const found: SearchResult[] = [];

    for (const cat of categories) {
      for (const sub of cat.subcategories) {
        for (const resource of sub.resources) {
          if (
            resource.name.toLowerCase().includes(q) ||
            resource.description.toLowerCase().includes(q) ||
            (resource.tags && resource.tags.some((t) => t.toLowerCase().includes(q)))
          ) {
            found.push({
              category: cat.title,
              categorySlug: cat.slug,
              subcategory: sub.title,
              resource,
            });
          }
        }
      }
    }
    setSearchTime(performance.now() - start);
    return found;
  }, [query]);

  // Apply category and starred filters
  const filteredResults = useMemo(() => {
    let filtered = results;
    if (selectedCategory) {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }
    if (starredOnly) {
      filtered = filtered.filter((r) => r.resource.starred);
    }
    return filtered;
  }, [results, selectedCategory, starredOnly]);

  const visibleResults = filteredResults.slice(0, visibleCount);
  const remaining = filteredResults.length - visibleCount;

  // Category counts for filter chips
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of results) {
      counts.set(r.category, (counts.get(r.category) || 0) + 1);
    }
    return counts;
  }, [results]);

  const groupedResults = useMemo(() => {
    const groups = new Map<string, SearchResult[]>();
    for (const r of visibleResults) {
      const existing = groups.get(r.category) || [];
      existing.push(r);
      groups.set(r.category, existing);
    }
    return groups;
  }, [visibleResults]);

  const totalResources = categories.reduce(
    (sum, cat) => sum + cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0),
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">検索</h1>
      <p className="text-sm text-muted mb-6">{totalResources.toLocaleString()}件のリソースから検索</p>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="リソースを検索... (例: VPN, 広告ブロック, アニメ)"
          className="w-full pl-12 pr-12 py-4 bg-card border border-border rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted"
          autoFocus
        />
        {inputValue && (
          <button
            onClick={() => { setInputValue(""); setQuery(""); setSelectedCategory(null); setStarredOnly(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors p-1"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {query.trim() ? (
        <>
          {/* Search info bar */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-4" aria-live="polite" aria-atomic="true">
            <p>
              「{query}」の検索結果: <span className="font-medium text-foreground">{filteredResults.length.toLocaleString()}</span> 件
              {selectedCategory && <span className="text-accent"> ({selectedCategory})</span>}
            </p>
            {searchTime > 0 && (
              <span className="inline-flex items-center gap-1 text-xs">
                <Clock size={10} />
                {(searchTime / 1000).toFixed(2)}秒
              </span>
            )}
          </div>

          {/* Category filter chips */}
          {categoryCounts.size > 1 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Filter size={14} className="text-muted shrink-0" />
              <button
                onClick={() => { setSelectedCategory(null); setVisibleCount(RESULTS_PER_PAGE); }}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                  !selectedCategory
                    ? "bg-accent/10 text-accent border-accent/30 font-medium"
                    : "bg-card border-border text-muted hover:border-accent/20 hover:text-accent"
                }`}
              >
                すべて ({results.length})
              </button>
              {Array.from(categoryCounts.entries())
                .sort((a, b) => b[1] - a[1])
                .map(([catName, count]) => {
                  const cat = categories.find((c) => c.title === catName);
                  return (
                    <button
                      key={catName}
                      onClick={() => { setSelectedCategory(catName === selectedCategory ? null : catName); setVisibleCount(RESULTS_PER_PAGE); }}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                        selectedCategory === catName
                          ? "bg-accent/10 text-accent border-accent/30 font-medium"
                          : "bg-card border-border text-muted hover:border-accent/20 hover:text-accent"
                      }`}
                    >
                      {cat?.icon} {catName} ({count})
                    </button>
                  );
                })}
              <button
                onClick={() => { setStarredOnly(!starredOnly); setVisibleCount(RESULTS_PER_PAGE); }}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all inline-flex items-center gap-1 ${
                  starredOnly
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30 font-medium"
                    : "bg-card border-border text-muted hover:border-amber-500/20 hover:text-amber-500"
                }`}
              >
                <Star size={10} className={starredOnly ? "fill-amber-500" : ""} />
                おすすめのみ
              </button>
            </div>
          )}

          {isSearching ? (
            <SearchSkeleton />
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-bold mb-2">結果が見つかりません</h2>
              <p className="text-sm text-muted mb-4">
                別のキーワードで検索するか、フィルターを変更してください。
              </p>
              {(selectedCategory || starredOnly) && (
                <button
                  onClick={() => { setSelectedCategory(null); setStarredOnly(false); }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  <X size={14} />
                  フィルターをクリア
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-8">
                {Array.from(groupedResults.entries()).map(([catName, items]) => (
                  <section key={catName}>
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <span>{categories.find(c => c.title === catName)?.icon}</span>
                      {catName}
                      <span className="text-xs text-muted font-normal">({items.length})</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {items.map((item, idx) => (
                        <ResourceCard key={item.resource.name + item.subcategory + idx} resource={item.resource} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {remaining > 0 && (
                <button
                  onClick={() => setVisibleCount((v) => v + RESULTS_PER_PAGE)}
                  className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 text-sm text-muted hover:text-accent transition-all"
                >
                  <ChevronDown size={16} />
                  もっと表示（残り {remaining.toLocaleString()}件）
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-xl font-bold mb-2">何をお探しですか？</h2>
          <p className="text-sm text-muted max-w-md mx-auto">
            上の検索ボックスにキーワードを入力して、{totalResources.toLocaleString()}以上の無料リソースから検索しましょう。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["VPN", "広告ブロック", "アニメ", "エミュレーター", "AI", "漫画", "YouTube", "Discord", "ゲーム", "音楽"].map((tag) => (
              <button
                key={tag}
                onClick={() => { setInputValue(tag); setQuery(tag); }}
                className="px-4 py-2 text-sm rounded-full bg-card border border-border hover:bg-card-hover hover:border-accent/30 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Popular categories quick access */}
          <div className="mt-10">
            <h3 className="text-sm font-medium text-muted mb-4">カテゴリから探す</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.slice(0, 12).map((cat) => (
                <a
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl bg-card border border-border hover:bg-card-hover hover:border-accent/30 transition-all"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-8 w-24 bg-card rounded-lg mb-6" />
        <div className="h-14 w-full bg-card rounded-2xl mb-8" />
        <SearchSkeleton />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
