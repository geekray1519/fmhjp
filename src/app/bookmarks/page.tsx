"use client";

import { useBookmarks } from "@/components/BookmarksProvider";
import { useToast } from "@/components/ToastProvider";
import { Bookmark, ExternalLink, Star, Trash2, X } from "lucide-react";
import Link from "next/link";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark, clearBookmarks, bookmarkCount } =
    useBookmarks();
  const { showToast } = useToast();

  const handleRemove = (url: string, name: string) => {
    toggleBookmark({ name, url, description: "" });
    showToast(`「${name}」を削除しました`);
  };

  const handleClearAll = () => {
    clearBookmarks();
    showToast("すべてのブックマークを削除しました");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
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
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-border text-muted hover:text-red-500 hover:border-red-500/30 transition-all"
          >
            <Trash2 size={12} />
            すべて削除
          </button>
        )}
      </div>

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
          {bookmarks.map((item) => (
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
