"use client";

import { useState, useMemo } from "react";
import { useBookmarks } from "@/components/BookmarksProvider";
import { useToast } from "@/components/ToastProvider";
import { Bookmark, ExternalLink, Star, Trash2, X, Download, SortAsc, Clock, ArrowDownAZ } from "lucide-react";
import Link from "next/link";

type SortMode = "newest" | "oldest" | "name";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark, clearBookmarks, bookmarkCount } =
    useBookmarks();
  const { showToast } = useToast();
  const [sortMode, setSortMode] = useState<SortMode>("newest");

  const sortedBookmarks = useMemo(() => {
    const sorted = [...bookmarks];
    switch (sortMode) {
      case "newest":
        return sorted.sort((a, b) => b.addedAt - a.addedAt);
      case "oldest":
        return sorted.sort((a, b) => a.addedAt - b.addedAt);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name, "ja"));
      default:
        return sorted;
    }
  }, [bookmarks, sortMode]);

  const handleRemove = (url: string, name: string) => {
    toggleBookmark({ name, url, description: "" });
    showToast(`「${name}」を削除しました`);
  };

  const handleClearAll = () => {
    clearBookmarks();
    showToast("すべてのブックマークを削除しました");
  };

  const handleExport = () => {
    const lines = bookmarks.map(
      (b) => `${b.name}\n  URL: ${b.url}${b.description ? `\n  説明: ${b.description}` : ""}\n  追加日: ${new Date(b.addedAt).toLocaleDateString("ja-JP")}`
    );
    const content = `FMHJP ブックマーク (${new Date().toLocaleDateString("ja-JP")})\n${"=".repeat(40)}\n\n${lines.join("\n\n")}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fmhjp-bookmarks-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("ブックマークをエクスポートしました");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-start sm:items-center justify-between gap-4 mb-6 flex-col sm:flex-row">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bookmark size={28} className="text-accent" />
            ブックマーク
          </h1>
          <p className="text-sm text-muted mt-1">
            保存したリソース（{bookmarkCount}件）
          </p>
        </div>
        {bookmarkCount > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-border text-muted hover:text-accent hover:border-accent/30 transition-all"
            >
              <Download size={12} />
              エクスポート
            </button>
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-border text-muted hover:text-red-500 hover:border-red-500/30 transition-all"
            >
              <Trash2 size={12} />
              すべて削除
            </button>
          </div>
        )}
      </div>

      {/* Sort controls */}
      {bookmarkCount > 1 && (
        <div className="flex items-center gap-2 mb-4">
          <SortAsc size={14} className="text-muted" />
          <div className="flex gap-1">
            {([
              { key: "newest" as const, label: "新しい順", icon: Clock },
              { key: "oldest" as const, label: "古い順", icon: Clock },
              { key: "name" as const, label: "名前順", icon: ArrowDownAZ },
            ]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSortMode(key)}
                className={`px-2.5 py-1 text-[10px] rounded-full border transition-all ${
                  sortMode === key
                    ? "bg-accent/10 text-accent border-accent/30 font-medium"
                    : "bg-card border-border text-muted hover:border-accent/20 hover:text-accent"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {bookmarkCount === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📑</div>
          <h2 className="text-xl font-bold mb-2">
            ブックマークはまだありません
          </h2>
          <p className="text-sm text-muted max-w-md mx-auto mb-6">
            リソースカードの
            <Bookmark size={12} className="inline mx-1" />
            ボタンをクリックして、お気に入りのリソースを保存しましょう。
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 text-sm rounded-xl bg-accent text-white hover:bg-accent/90 transition-colors"
            >
              ホームへ
            </Link>
            <Link
              href="/search"
              className="px-4 py-2 text-sm rounded-xl border border-border hover:border-accent/30 hover:text-accent transition-all"
            >
              検索する
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedBookmarks.map((item) => (
            <div
              key={item.url}
              className={`group flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:bg-card-hover transition-all ${
                item.starred ? "starred-glow" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {item.starred && (
                    <Star
                      size={14}
                      className="text-amber-400 fill-amber-400 shrink-0"
                    />
                  )}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm hover:text-accent transition-colors truncate"
                  >
                    {item.name}
                  </a>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted/50 hover:text-accent transition-colors shrink-0"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
                {item.description && (
                  <p className="mt-1 text-xs text-muted line-clamp-2">
                    {item.description}
                  </p>
                )}
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted/60">
                  <span>
                    {new Date(item.addedAt).toLocaleDateString("ja-JP")}に追加
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.url, item.name)}
                className="p-1.5 rounded-md text-muted/50 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 shrink-0"
                title="削除"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
