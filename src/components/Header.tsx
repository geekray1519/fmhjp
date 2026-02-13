"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Search, Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onMenuToggle?: () => void;
  menuOpen?: boolean;
}

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border bg-background/80">
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
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold gradient-text">FMHJP</span>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="リソースを検索..."
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="テーマ切り替え"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="sm:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="リソースを検索..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
