"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data";
import { ResourceCard } from "@/components/ResourceCard";
import { SearchResult } from "@/lib/types";
import { Search, X, ChevronDown, Clock } from "lucide-react";

const RESULTS_PER_PAGE = 50;

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);
  const [searchTime, setSearchTime] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setQuery(inputValue);
      setVisibleCount(RESULTS_PER_PAGE);
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputValue]);

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

  const visibleResults = results.slice(0, visibleCount);
  const remaining = results.length - visibleCount;

  const groupedResults = useMemo(() => {
    const groups = new Map<string, SearchResult[]>();
    for (const r of visibleResults) {
      const existing = groups.get(r.category) || [];
      existing.push(r);
      groups.set(r.category, existing);
    }
    return groups;
  }, [visibleResults]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">検索</h1>

      <div className="relative mb-8">
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
            onClick={() => { setInputValue(""); setQuery(""); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {query.trim() ? (
        <>
          <div className="flex items-center gap-3 text-sm text-muted mb-6">
            <p>
              「{query}」の検索結果: <span className="font-medium text-foreground">{results.length.toLocaleString()}</span> 件
            </p>
            {searchTime > 0 && (
              <span className="inline-flex items-center gap-1 text-xs">
                <Clock size={10} />
                {(searchTime / 1000).toFixed(2)}秒
              </span>
            )}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-bold mb-2">結果が見つかりません</h2>
              <p className="text-sm text-muted">
                別のキーワードで検索してみてください。
              </p>
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
            上の検索ボックスにキーワードを入力して、21,000以上の無料リソースから検索しましょう。
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
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8 text-center text-muted">読み込み中...</div>}>
      <SearchContent />
    </Suspense>
  );
}
