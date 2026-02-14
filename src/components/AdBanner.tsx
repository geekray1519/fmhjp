"use client";

import { useEffect, useRef, useId } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";
  responsive?: boolean;
  className?: string;
  layoutKey?: string;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  layoutKey,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const id = useId();

  useEffect(() => {
    if (!ADSENSE_ID || pushed.current) return;

    // Wait for AdSense script to be available
    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && adRef.current) {
          const adElement = adRef.current;
          if (adElement && adElement.getAttribute("data-ad-status") !== "filled") {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushed.current = true;
          }
        }
      } catch {
        // AdSense script not loaded yet or ad already pushed
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Don't render ad container if no AdSense ID configured
  if (!ADSENSE_ID) return null;

  return (
    <div className={`ad-container my-6 ${className}`}>
      <div className="text-[10px] text-muted/40 text-center mb-1 select-none">
        スポンサー
      </div>
      <ins
        ref={adRef}
        key={id}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", minHeight: "90px" }}
        data-ad-client={ADSENSE_ID}
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      />
    </div>
  );
}

/**
 * In-feed ad - コンテンツリストに溶け込む広告
 */
export function InFeedAd({ className = "" }: { className?: string }) {
  return (
    <AdBanner
      format="fluid"
      layoutKey="-fb+5w+4e-db+86"
      className={className}
    />
  );
}

/**
 * In-article ad - セクション間に配置する広告
 */
export function InArticleAd({ className = "" }: { className?: string }) {
  return (
    <AdBanner
      format="fluid"
      layoutKey="-gw-3+1f-69+7a"
      className={className}
    />
  );
}

/**
 * Sidebar ad - サイドバーに配置するレクタングル広告
 */
export function SidebarAd({ className = "" }: { className?: string }) {
  return (
    <AdBanner
      format="rectangle"
      className={className}
    />
  );
}
