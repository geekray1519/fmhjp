"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import { Search, Moon, Sun, Menu, X, Command, ChevronDown } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data";
import { CommandPalette } from "./CommandPalette";

interface HeaderProps {
  onMenuToggle?: () => void;
  menuOpen?: boolean;
}

const WIKI_SLUGS = [
  "privacy", "ai", "video", "audio", "gaming", "reading",
  "downloading", "torrenting", "educational", "mobile",
  "linux-macos", "non-english", "misc", "unsafe",
];
const TOOLS_SLUGS = [
  "system-tools", "file-tools", "internet-tools", "social-media-tools",
  "text-tools", "gaming-tools", "image-tools", "video-tools",
  "developer-tools", "storage",
];

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoryDropdown(false);
      }
    };
    if (categoryDropdown) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [categoryDropdown]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setPaletteOpen(true);
    }
    if (e.key === "Escape") {
      setCategoryDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const getCat = (slug: string) => categories.find((c) => c.slug === slug);

  return (
    <>
      <header
        className={`sticky top-0 z-50 glass border-b border-border bg-background/80 transition-shadow duration-300 ${scrolled ? "header-scrolled" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-card transition-colors"
                aria-label="メニュー"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-2xl font-bold gradient-text-shimmer">
                  FMHJP
                </span>
              </Link>

              {/* Desktop category dropdown trigger */}
              <div ref={dropdownRef} className="relative hidden lg:block">
                <button
                  onClick={() => setCategoryDropdown(!categoryDropdown)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                    categoryDropdown
                      ? "bg-accent/10 text-accent"
                      : "text-muted hover:text-foreground hover:bg-card"
                  }`}
                  aria-expanded={categoryDropdown}
                  aria-haspopup="true"
                >
                  カテゴリ
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${categoryDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown mega menu */}
                {categoryDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-[520px] bg-background border border-border rounded-2xl shadow-2xl shadow-black/10 p-4 animate-scale-in z-50">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Wiki column */}
                      <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-muted/70 mb-2 px-1">
                          Wiki
                        </h3>
                        <div className="space-y-0.5">
                          {WIKI_SLUGS.map((slug) => {
                            const cat = getCat(slug);
                            if (!cat) return null;
                            const count = cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0);
                            return (
                              <Link
                                key={cat.id}
                                href={`/${cat.slug}`}
                                onClick={() => setCategoryDropdown(false)}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card-hover transition-colors"
                              >
                                <span className="w-5 text-center text-base">
                                  {cat.icon}
                                </span>
                                <span className="truncate flex-1">{cat.title}</span>
                                <span className="text-[10px] text-muted/60 tabular-nums">{count}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tools column */}
                      <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-muted/70 mb-2 px-1">
                          ツール
                        </h3>
                        <div className="space-y-0.5">
                          {TOOLS_SLUGS.map((slug) => {
                            const cat = getCat(slug);
                            if (!cat) return null;
                            const count = cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0);
                            return (
                              <Link
                                key={cat.id}
                                href={`/${cat.slug}`}
                                onClick={() => setCategoryDropdown(false)}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card-hover transition-colors"
                              >
                                <span className="w-5 text-center text-base">
                                  {cat.icon}
                                </span>
                                <span className="truncate flex-1">{cat.title}</span>
                                <span className="text-[10px] text-muted/60 tabular-nums">{count}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Quick links footer */}
                    <div className="mt-3 pt-3 border-t border-border flex items-center gap-3">
                      <Link
                        href="/search"
                        onClick={() => setCategoryDropdown(false)}
                        className="text-xs text-muted hover:text-accent transition-colors"
                      >
                        🔍 検索
                      </Link>
                      <Link
                        href="/beginners-guide"
                        onClick={() => setCategoryDropdown(false)}
                        className="text-xs text-muted hover:text-accent transition-colors"
                      >
                        📖 初心者ガイド
                      </Link>
                      <Link
                        href="/about"
                        onClick={() => setCategoryDropdown(false)}
                        className="text-xs text-muted hover:text-accent transition-colors"
                      >
                        ℹ️ FMHJPについて
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop: Clickable search trigger (opens Command Palette) */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:flex flex-1 max-w-md mx-8 items-center gap-3 px-4 py-2 bg-card border border-border rounded-xl text-sm text-muted hover:border-accent/30 hover:text-foreground transition-all cursor-text search-glow group"
            >
              <Search
                size={16}
                className="text-muted group-hover:text-accent transition-colors shrink-0"
              />
              <span className="flex-1 text-left">リソースを検索...</span>
              <div className="flex items-center gap-1 text-[10px] pointer-events-none">
                <kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono">
                  <Command size={10} className="inline -mt-0.5" />
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono">
                  K
                </kbd>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  document.documentElement.classList.add("theme-transitioning");
                  setTheme(theme === "dark" ? "light" : "dark");
                  setTimeout(() => {
                    document.documentElement.classList.remove("theme-transitioning");
                  }, 500);
                }}
                className="p-2 rounded-lg hover:bg-card transition-colors"
                aria-label="テーマ切り替え"
              >
                {mounted ? (
                  theme === "dark" ? (
                    <Sun size={18} className="transition-transform duration-300 hover:rotate-45" />
                  ) : (
                    <Moon size={18} className="transition-transform duration-300 hover:-rotate-12" />
                  )
                ) : (
                  <div className="w-[18px] h-[18px]" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile: Clickable search trigger */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="sm:hidden flex w-full items-center gap-3 px-4 py-2 mb-3 bg-card border border-border rounded-xl text-sm text-muted"
          >
            <Search size={16} className="shrink-0" />
            <span className="flex-1 text-left">リソースを検索...</span>
          </button>
        </div>
      </header>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </>
  );
}
