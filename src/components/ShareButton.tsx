"use client";

import { useState, useCallback } from "react";
import { Share2, Check } from "lucide-react";
import { useToast } from "./ToastProvider";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleShare = useCallback(async () => {
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    const shareData = { title, url: shareUrl };

    // Try native share API first (mobile)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast("URLをコピーしました");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("コピーに失敗しました", "error");
    }
  }, [title, url, showToast]);

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-card border border-border text-xs text-muted hover:text-accent hover:border-accent/30 transition-all"
      title="共有"
    >
      {copied ? (
        <Check size={12} className="text-green-500" />
      ) : (
        <Share2 size={12} />
      )}
      <span className="hidden sm:inline">共有</span>
    </button>
  );
}
