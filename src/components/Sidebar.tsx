"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";
import { Home, BookOpen } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 
          bg-background border-r border-border
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-16
          overflow-y-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="p-4 space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-200
              ${pathname === "/"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:text-foreground hover:bg-card"
              }
            `}
          >
            <Home size={18} />
            <span>ホーム</span>
          </Link>

          <Link
            href="/beginners-guide"
            onClick={onClose}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-200
              ${pathname === "/beginners-guide"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:text-foreground hover:bg-card"
              }
            `}
          >
            <BookOpen size={18} />
            <span>初心者ガイド</span>
          </Link>

          <div className="pt-4 pb-2">
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-muted">
              カテゴリ
            </span>
          </div>

          {categories.map((cat) => {
            const isActive = pathname === `/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                  transition-all duration-200
                  ${isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted hover:text-foreground hover:bg-card"
                  }
                `}
              >
                <span className="text-base">{cat.icon}</span>
                <span className="truncate">{cat.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
