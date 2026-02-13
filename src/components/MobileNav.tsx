"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Bookmark, BookOpen, Wrench } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "ホーム" },
  { href: "/search", icon: Search, label: "検索" },
  { href: "/bookmarks", icon: Bookmark, label: "保存済み" },
  { href: "/system-tools", icon: Wrench, label: "ツール" },
  { href: "/beginners-guide", icon: BookOpen, label: "ガイド" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-background/95 glass border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
