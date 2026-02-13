"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/data";
import { Resource } from "@/lib/types";
import {
  Search,
  X,
  Star,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
  Hash,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface PaletteResult {
  resource: Resource;
  category: string;
  categoryIcon: string;
  categorySlug: string;
  subcategory: string;
}

const POPULAR_TAGS = [
  "VPN",
  "AI",
  "YouTube",
  "Discord",
  "広告ブロック",
  "アニメ",
  "漫画",
  "音楽",
  "ゲーム",
  "エミュレーター",
];

const MAX_RESULTS = 20;

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      // Small delay to ensure the modal is rendered
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Search through all resources
  const results = useMemo<PaletteResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const found: PaletteResult[] = [];

    for (const cat of categories) {
      for (const sub of cat.subcategories) {
        for (const resource of sub.resources) {
          if (found.length >= MAX_RESULTS) break;
          if (
            resource.name.toLowerCase().includes(q) ||
            resource.description.toLowerCase().includes(q) ||
            (resource.tags &&
              resource.tags.some((t) => t.toLowerCase().includes(q)))
          ) {
            found.push({
              resource,
              category: cat.title,
              categoryIcon: cat.icon,
              categorySlug: cat.slug,
              subcategory: sub.title,
            });
          }
        }
        if (found.length >= MAX_RESULTS) break;
      }
      if (found.length >= MAX_RESULTS) break;
    }
    return found;
  }, [query]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selected = listRef.current.querySelector(
      `[data-index="${selectedIndex}"]`
    );
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const navigateToResult = useCallback(
    (result: PaletteResult) => {
      window.open(result.resource.url, "_blank", "noopener,noreferrer");
      onClose();
    },
    [onClose]
  );

  const submitSearch = useCallback(
    (searchQuery: string) => {
      const q = searchQuery.trim();
      if (!q) return;
      // Add to recent searches
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s !== q);
        return [q, ...filtered].slice(0, 5);
      });
      router.push(`/search?q=${encodeURIComponent(q)}`);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (results.length > 0 && results[selectedIndex]) {
            navigateToResult(results[selectedIndex]);
          } else {
            submitSearch(query);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [results, selectedIndex, navigateToResult, submitSearch, query, onClose]
  );

  if (!open) return null;

  const hasQuery = query.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl mx-4 bg-background border border-border rounded-2xl shadow-2xl shadow-black/20 animate-scale-in overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="コマンドパレット検索"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search size={18} className="text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="リソースを検索..."
            className="flex-1 py-4 bg-transparent text-base outline-none placeholder:text-muted"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 text-muted hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-mono text-muted bg-card border border-border rounded">
            Esc
          </kbd>
        </div>

        {/* Results area */}
        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto overscroll-contain"
        >
          {hasQuery ? (
            results.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-1.5 text-[10px] font-medium text-muted uppercase tracking-wider">
                  {results.length >= MAX_RESULTS
                    ? `${MAX_RESULTS}+件の結果`
                    : `${results.length}件の結果`}
                </div>
                {results.map((result, idx) => (
                  <button
                    key={`${result.resource.name}-${result.subcategory}-${idx}`}
                    data-index={idx}
                    onClick={() => navigateToResult(result)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
                      selectedIndex === idx
                        ? "bg-accent/10"
                        : "hover:bg-card-hover"
                    }`}
                  >
                    <span className="text-base shrink-0 mt-0.5">
                      {result.categoryIcon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {result.resource.starred && (
                          <Star
                            size={12}
                            className="text-amber-400 fill-amber-400 shrink-0"
                          />
                        )}
                        <span
                          className={`text-sm font-medium truncate ${
                            selectedIndex === idx ? "text-accent" : ""
                          }`}
                        >
                          {result.resource.name}
                        </span>
                      </div>
                      {result.resource.description && (
                        <p className="text-xs text-muted truncate mt-0.5">
                          {result.resource.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-muted/70">
                          {result.category}
                        </span>
                        <span className="text-[10px] text-muted/50">›</span>
                        <span className="text-[10px] text-muted/70 truncate">
                          {result.subcategory}
                        </span>
                      </div>
                    </div>
                    <ExternalLink
                      size={12}
                      className={`shrink-0 mt-1.5 ${
                        selectedIndex === idx
                          ? "text-accent"
                          : "text-muted/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-12 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-sm text-muted">
                  「{query}」の結果が見つかりません
                </p>
                <button
                  onClick={() => submitSearch(query)}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-xs rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  <Search size={12} />
                  詳細検索ページで検索
                </button>
              </div>
            )
          ) : (
            <div className="py-2">
              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <>
                  <div className="px-4 py-1.5 text-[10px] font-medium text-muted uppercase tracking-wider">
                    最近の検索
                  </div>
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => {
                        setQuery(search);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-card-hover transition-colors"
                    >
                      <Search size={14} className="text-muted/50 shrink-0" />
                      <span className="text-sm text-muted">{search}</span>
                    </button>
                  ))}
                  <div className="my-1 border-t border-border" />
                </>
              )}

              {/* Popular tags */}
              <div className="px-4 py-1.5 text-[10px] font-medium text-muted uppercase tracking-wider">
                人気のキーワード
              </div>
              <div className="px-4 py-2 flex flex-wrap gap-2">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-card border border-border text-muted hover:text-accent hover:border-accent/30 transition-all"
                  >
                    <Hash size={10} />
                    {tag}
                  </button>
                ))}
              </div>

              {/* Quick category access */}
              <div className="my-1 border-t border-border" />
              <div className="px-4 py-1.5 text-[10px] font-medium text-muted uppercase tracking-wider">
                カテゴリ
              </div>
              <div className="px-2 py-1 grid grid-cols-2 gap-0.5">
                {categories.slice(0, 8).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      router.push(`/${cat.slug}`);
                      onClose();
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted hover:text-foreground hover:bg-card-hover transition-colors text-left"
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with keyboard hints */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border bg-card/50 text-[10px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CornerDownLeft size={10} />
            で開く
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ArrowUp size={10} />
            <ArrowDown size={10} />
            で選択
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="px-1 py-0.5 font-mono bg-background border border-border rounded text-[9px]">
              Esc
            </kbd>
            で閉じる
          </span>
        </div>
      </div>
    </div>
  );
}
