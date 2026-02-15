"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

/* ─────────────────────────── Base AdUnit ─────────────────────────── */

interface AdUnitProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";
  responsive?: boolean;
  className?: string;
  layoutKey?: string;
  /** Lazy-load via IntersectionObserver (default: true) */
  lazy?: boolean;
  /** Reserve height to prevent CLS (default: 90) */
  minHeight?: number;
  /** Label above ad (default: "スポンサー") */
  label?: string;
}

function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  layoutKey,
  lazy = true,
  minHeight = 90,
  label = "スポンサー",
}: AdUnitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const adRef = useRef<HTMLModElement>(null);
  const [isVisible, setIsVisible] = useState(!lazy);
  const pushed = useRef(false);

  // Lazy-load: start rendering ad when within 200px of viewport
  useEffect(() => {
    if (!lazy || isVisible) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy, isVisible]);

  // Push ad once visible
  useEffect(() => {
    if (!isVisible || pushed.current || !ADSENSE_ID) return;

    const timer = setTimeout(() => {
      try {
        const el = adRef.current;
        if (el && el.getAttribute("data-ad-status") !== "filled") {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushed.current = true;
        }
      } catch {
        // AdSense script not loaded yet
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!ADSENSE_ID) return null;

  return (
    <div
      ref={containerRef}
      className={`ad-container my-6 ${className}`}
      style={{ minHeight: `${minHeight}px` }}
    >
      <div className="text-[10px] text-muted/40 text-center mb-1 select-none">
        {label}
      </div>
      {isVisible && (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-client={ADSENSE_ID.trim()}
          {...(slot ? { "data-ad-slot": slot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
          {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
        />
      )}
    </div>
  );
}

/* ─────────────────────── Public Components ─────────────────────── */

/**
 * Standard display ad (leaderboard / responsive).
 * Use above fold with `lazy={false}` for immediate load.
 */
export function AdBanner({
  className = "",
  lazy = true,
  slot,
}: {
  className?: string;
  lazy?: boolean;
  slot?: string;
}) {
  return (
    <AdUnit
      format="auto"
      responsive
      className={className}
      lazy={lazy}
      minHeight={90}
      slot={slot}
    />
  );
}

/**
 * In-feed ad — blends into resource card grids.
 * Best for: between resource cards in category listings.
 */
export function InFeedAd({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      format="fluid"
      layoutKey="-fb+5w+4e-db+86"
      className={className}
      lazy
      minHeight={120}
    />
  );
}

/**
 * In-article ad — for between content sections.
 * Best for: between subcategory sections.
 */
export function InArticleAd({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      format="fluid"
      layoutKey="-gw-3+1f-69+7a"
      className={className}
      lazy
      minHeight={120}
    />
  );
}

/**
 * Multiplex ad — grid of recommended content + ads.
 * Best for: end of page, before footer.
 */
export function MultiplexAd({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      format="auto"
      responsive
      className={className}
      lazy
      minHeight={250}
      label="おすすめコンテンツ"
    />
  );
}

/**
 * Sidebar ad — sticky rectangle for desktop sidebar.
 * Best for: TOC sidebar area on category pages.
 */
export function SidebarAd({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      format="vertical"
      responsive={false}
      className={className}
      lazy
      minHeight={250}
    />
  );
}

/**
 * Calculates optimal in-feed ad insertion positions based on total subcategory count.
 * Returns array of indices AFTER which an ad should be inserted.
 * - Max 4 in-feed ads per listing
 * - Density: 1 ad per 5-12 items depending on total
 */
export function getAdPositions(totalItems: number): number[] {
  if (totalItems <= 3) return [];
  if (totalItems <= 8) return [2];
  if (totalItems <= 15) return [3, 10];
  if (totalItems <= 30) return [4, 12, 22];
  // Large lists: every ~10 items, max 4
  const positions: number[] = [];
  for (let i = 4; i < totalItems && positions.length < 4; i += 10) {
    positions.push(i);
  }
  return positions;
}
