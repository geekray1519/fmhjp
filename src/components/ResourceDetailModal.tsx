"use client";

import { useEffect, useCallback, useState } from "react";
import { Resource } from "@/lib/types";
import { ExternalLink, X, Star, Copy, Check, Link2, Bookmark, Globe, Share2 } from "lucide-react";
import { useToast } from "./ToastProvider";
import { useBookmarks } from "./BookmarksProvider";

interface ResourceDetailModalProps {
  resource: Resource | null;
  onClose: () => void;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function ResourceDetailModal({ resource, onClose }: ResourceDetailModalProps) {
  const { showToast } = useToast();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [copied, setCopied] = useState(false);
  const [faviconError, setFaviconError] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!resource) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [resource, handleKeyDown]);

  // Reset state when resource changes
  useEffect(() => {
    setCopied(false);
    setFaviconError(false);
  }, [resource]);

  if (!resource) return null;

  const domain = getDomain(resource.url);
  const bookmarked = isBookmarked(resource.url);

  const handleCopy = () => {
    navigator.clipboard.writeText(resource.url).then(() => {
      setCopied(true);
      showToast("URLをコピーしました");
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {
      showToast("コピーに失敗しました", "error");
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: resource.name, url: resource.url });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleBookmark = () => {
    toggleBookmark({
      name: resource.name,
      url: resource.url,
      description: resource.description,
      starred: resource.starred,
    });
    showToast(bookmarked ? "ブックマークを解除しました" : "ブックマークに追加しました");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg mx-0 sm:mx-4 bg-background border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 min-w-0">
            {resource.starred && (
              <Star size={16} className="text-amber-400 fill-amber-400 shrink-0" />
            )}
            <h2 className="text-lg font-bold truncate">{resource.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-card transition-colors shrink-0"
            aria-label="閉じる"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-5">
          {/* Domain + favicon */}
          <div className="flex items-center gap-2">
            {faviconError ? (
              <Globe size={20} className="text-muted/50 shrink-0" />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                alt=""
                className="w-5 h-5 rounded shrink-0"
                loading="lazy"
                onError={() => setFaviconError(true)}
              />
            )}
            <span className="text-sm text-muted truncate">{domain}</span>
          </div>

          {/* Description */}
          {resource.description && (
            <p className="text-sm text-foreground/90 leading-relaxed">
              {resource.description}
            </p>
          )}

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* URL */}
          <div className="p-3 rounded-xl bg-card border border-border">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-1.5">URL</p>
            <p className="text-sm text-foreground break-all font-mono">{resource.url}</p>
          </div>

          {/* Mirror links */}
          {resource.mirrors && resource.mirrors.length > 0 && (
            <div className="p-3 rounded-xl bg-card border border-border">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2 flex items-center gap-1">
                <Link2 size={10} />
                代替リンク ({resource.mirrors.length})
              </p>
              <div className="space-y-1.5">
                {resource.mirrors.map((mirror, idx) => {
                  let mirrorDomain = "";
                  try { mirrorDomain = new URL(mirror).hostname.replace(/^www\./, ""); } catch { /* */ }
                  return (
                    <a
                      key={idx}
                      href={mirror}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-muted hover:text-accent hover:bg-card-hover transition-colors"
                    >
                      <ExternalLink size={12} className="shrink-0" />
                      <span className="truncate">{mirrorDomain || mirror}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Starred badge */}
          {resource.starred && (
            <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-amber-500">おすすめリソース</span>
              </div>
              <p className="text-xs text-muted mt-1">
                このリソースは品質が高く、特におすすめです。
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-5 py-4 flex items-center gap-2">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <ExternalLink size={14} />
            サイトを開く
          </a>
          <button
            onClick={handleBookmark}
            className={`p-2.5 rounded-xl border transition-all ${
              bookmarked
                ? "bg-accent/10 border-accent/30 text-accent"
                : "bg-card border-border text-muted hover:text-accent hover:border-accent/30"
            }`}
            title={bookmarked ? "ブックマーク解除" : "ブックマーク追加"}
          >
            <Bookmark size={16} className={bookmarked ? "fill-accent" : ""} />
          </button>
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl bg-card border border-border text-muted hover:text-accent hover:border-accent/30 transition-all"
            title="URLをコピー"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-card border border-border text-muted hover:text-accent hover:border-accent/30 transition-all"
            title="共有"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
