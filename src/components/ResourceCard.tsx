"use client";

import { useState, useCallback } from "react";
import { Resource } from "@/lib/types";
import { ExternalLink, Star, Copy, Check, Link2, Bookmark, Globe, Info } from "lucide-react";
import { useToast } from "./ToastProvider";
import { useBookmarks } from "./BookmarksProvider";
import { useResourceDetail } from "./ResourceDetailProvider";

interface ResourceCardProps {
  resource: Resource;
}

function getDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const domain = getDomain(resource.url);
  const { showToast } = useToast();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { openDetail } = useResourceDetail();
  const [copied, setCopied] = useState(false);
  const [showMirrors, setShowMirrors] = useState(false);
  const [faviconError, setFaviconError] = useState(false);
  const bookmarked = isBookmarked(resource.url);

  const handleFaviconError = useCallback(() => {
    setFaviconError(true);
  }, []);

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(resource.url).then(() => {
      setCopied(true);
      showToast("URLをコピーしました");
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {
      showToast("コピーに失敗しました", "error");
    });
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark({
      name: resource.name,
      url: resource.url,
      description: resource.description,
      starred: resource.starred,
    });
    showToast(bookmarked ? "ブックマークを解除しました" : "ブックマークに追加しました");
  };

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      title={resource.url}
      className={`group block p-4 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 card-lift ${resource.starred ? "starred-glow" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {resource.starred && (
              <Star size={14} className="text-amber-400 fill-amber-400 shrink-0" />
            )}
            <h3 className="font-semibold text-sm group-hover:text-accent transition-colors truncate">
              {resource.name}
            </h3>
          </div>
          {resource.description && (
            <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
              {resource.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {domain && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full bg-card-hover text-muted border border-border">
                {faviconError ? (
                  <Globe size={12} className="text-muted/50 shrink-0" />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                    alt=""
                    className="favicon-img"
                    loading="lazy"
                    width={14}
                    height={14}
                    onError={handleFaviconError}
                  />
                )}
                {domain}
              </span>
            )}
            {resource.mirrors && resource.mirrors.length > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMirrors(!showMirrors);
                }}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full bg-card-hover text-muted border border-border hover:border-accent/30 hover:text-accent transition-all"
              >
                <Link2 size={8} />
                ミラー: {resource.mirrors.length}
              </button>
            )}
            {resource.tags && resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent"
              >
                {tag}
              </span>
            ))}
          {/* Expandable mirror links */}
          {showMirrors && resource.mirrors && resource.mirrors.length > 0 && (
            <div className="mt-2 p-2 rounded-lg bg-card-hover border border-border space-y-1">
              <p className="text-[10px] font-medium text-muted mb-1">代替リンク:</p>
              {resource.mirrors.map((mirror, idx) => {
                let mirrorDomain = "";
                try { mirrorDomain = new URL(mirror).hostname.replace(/^www\./, ""); } catch { /* */ }
                return (
                  <a
                    key={idx}
                    href={mirror}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-2 py-1 rounded-md text-[10px] text-muted hover:text-accent hover:bg-background transition-colors"
                  >
                    <ExternalLink size={8} className="shrink-0" />
                    <span className="truncate">{mirrorDomain || mirror}</span>
                  </a>
                );
              })}
            </div>
          )}
          </div>
        </div>
        <div className="flex items-center gap-0.5 shrink-0 mt-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openDetail(resource);
            }}
            className="p-1.5 sm:p-1 rounded-md sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-card-hover text-muted hover:text-accent"
            title="詳細を見る"
          >
            <Info size={13} />
          </button>
          <button
            onClick={handleToggleBookmark}
            className={`p-1.5 sm:p-1 rounded-md transition-all hover:bg-card-hover ${
              bookmarked
                ? "opacity-100 text-accent"
                : "sm:opacity-0 sm:group-hover:opacity-100 text-muted hover:text-accent"
            }`}
            title={bookmarked ? "ブックマーク解除" : "ブックマーク追加"}
          >
            <Bookmark
              size={13}
              className={bookmarked ? "fill-accent" : ""}
            />
          </button>
          <button
            onClick={handleCopyUrl}
            className="p-1.5 sm:p-1 rounded-md sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-card-hover text-muted hover:text-accent"
            title="URLをコピー"
          >
            {copied ? (
              <Check size={13} className="text-green-500" />
            ) : (
              <Copy size={13} />
            )}
          </button>
          <ExternalLink
            size={14}
            className="text-muted/70 group-hover:text-accent transition-colors"
          />
        </div>
      </div>
    </a>
  );
}
