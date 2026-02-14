"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data";
import { Home, BookOpen, Search, Bookmark, ChevronDown } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// Category groups matching FMHY's sidebar structure
const WIKI_SLUGS = [
  "privacy", "ai", "video", "audio", "gaming", "reading",
  "downloading", "torrenting", "educational", "mobile",
  "linux-macos", "non-english", "misc",
];

const TOOLS_SLUGS = [
  "system-tools", "file-tools", "internet-tools", "social-media-tools",
  "text-tools", "gaming-tools", "image-tools", "video-tools",
  "developer-tools",
];

const MORE_SLUGS = ["unsafe", "storage"];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const renderCategoryLink = (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    if (!cat) return null;
    const isActive = pathname === `/${cat.slug}`;
    const count = cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0);
    return (
      <Link
        key={cat.id}
        href={`/${cat.slug}`}
        onClick={onClose}
        aria-current={isActive ? "page" : undefined}
        className={`
          flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm
          transition-all duration-200 sidebar-item
          ${isActive
            ? "bg-accent/10 text-accent font-medium sidebar-active"
            : "text-muted hover:text-foreground hover:bg-card"
          }
        `}
      >
        <span className="text-base shrink-0 w-5 text-center">{cat.icon}</span>
        <span className="truncate flex-1">{cat.title}</span>
        <span className="text-[10px] text-muted shrink-0 tabular-nums">{count}</span>
      </Link>
    );
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 
          bg-background border-r border-border
          transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-16
          overflow-y-auto
          ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 lg:opacity-100"}
        `}
      >
        <nav className="p-3 space-y-0.5">
          <Link
            href="/"
            onClick={onClose}
            className={`
              flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${pathname === "/"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:text-foreground hover:bg-card"
              }
            `}
          >
            <Home size={16} />
            <span>ホーム</span>
          </Link>

          <Link
            href="/search"
            onClick={onClose}
            className={`
              flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${pathname === "/search"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:text-foreground hover:bg-card"
              }
            `}
          >
            <Search size={16} />
            <span>検索</span>
          </Link>

          <Link
            href="/bookmarks"
            onClick={onClose}
            className={`
              flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${pathname === "/bookmarks"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:text-foreground hover:bg-card"
              }
            `}
          >
            <Bookmark size={16} />
            <span>ブックマーク</span>
          </Link>

          <Link
            href="/beginners-guide"
            onClick={onClose}
            className={`
              flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${pathname === "/beginners-guide"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:text-foreground hover:bg-card"
              }
            `}
          >
            <BookOpen size={16} />
            <span>初心者ガイド</span>
          </Link>

          {/* Wiki group */}
          <div className="pt-4 pb-1.5">
            <button
              onClick={() => toggleGroup("wiki")}
              className="flex items-center justify-between w-full px-3 group"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted/70 group-hover:text-muted transition-colors">
                Wiki
              </span>
              <ChevronDown
                size={12}
                className={`text-muted/50 transition-transform duration-200 ${collapsedGroups.wiki ? "-rotate-90" : ""}`}
              />
            </button>
          </div>
          {!collapsedGroups.wiki && WIKI_SLUGS.map(renderCategoryLink)}

          {/* Tools group */}
          <div className="pt-4 pb-1.5">
            <button
              onClick={() => toggleGroup("tools")}
              className="flex items-center justify-between w-full px-3 group"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted/70 group-hover:text-muted transition-colors">
                ツール
              </span>
              <ChevronDown
                size={12}
                className={`text-muted/50 transition-transform duration-200 ${collapsedGroups.tools ? "-rotate-90" : ""}`}
              />
            </button>
          </div>
          {!collapsedGroups.tools && TOOLS_SLUGS.map(renderCategoryLink)}

          {/* More group */}
          <div className="pt-4 pb-1.5">
            <button
              onClick={() => toggleGroup("more")}
              className="flex items-center justify-between w-full px-3 group"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted/70 group-hover:text-muted transition-colors">
                その他
              </span>
              <ChevronDown
                size={12}
                className={`text-muted/50 transition-transform duration-200 ${collapsedGroups.more ? "-rotate-90" : ""}`}
              />
            </button>
          </div>
          {!collapsedGroups.more && MORE_SLUGS.map(renderCategoryLink)}

          {/* Quick stats */}
          <div className="mt-6 mx-3 p-3 rounded-xl bg-card/50 border border-border text-center">
            <div className="flex items-center justify-around text-[10px] text-muted">
              <div>
                <div className="font-bold text-foreground text-xs">{categories.length}</div>
                <div>カテゴリ</div>
              </div>
              <div className="w-px h-6 bg-border" />
              <div>
                <div className="font-bold text-foreground text-xs">
                  {categories.reduce((sum, cat) => sum + cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0), 0).toLocaleString()}
                </div>
                <div>リソース</div>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
