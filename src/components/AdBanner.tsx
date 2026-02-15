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

/* ═══════════════════════ Third-Party Ad Networks ═══════════════════════ */

const PROPELLER_ID = process.env.NEXT_PUBLIC_PROPELLER_ID;
const ADSTERRA_ID = process.env.NEXT_PUBLIC_ADSTERRA_ID;
const ADMAVEN_ID = process.env.NEXT_PUBLIC_ADMAVEN_ID;
const ADSKEEPER_WIDGET = process.env.NEXT_PUBLIC_ADSKEEPER_WIDGET;
const POPADS_ID = process.env.NEXT_PUBLIC_POPADS_ID;
const HILLTOP_ID = process.env.NEXT_PUBLIC_HILLTOP_ID;
const EXOCLICK_ID = process.env.NEXT_PUBLIC_EXOCLICK_ID;

/**
 * PropellerAds ネイティブバナー広告
 * Zone ID を NEXT_PUBLIC_PROPELLER_ID に設定して有効化
 */
export function PropellerAd({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || loaded.current || !PROPELLER_ID) return;
    loaded.current = true;
    const container = containerRef.current;
    if (!container) return;
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = `//thubanoa.com/${PROPELLER_ID}/invoke.js`;
    container.appendChild(script);
  }, [isVisible]);

  if (!PROPELLER_ID) return null;

  return (
    <div ref={containerRef} className={`ad-container my-6 ${className}`} style={{ minHeight: "250px" }}>
      <div className="text-[10px] text-muted/40 text-center mb-1 select-none">広告</div>
      {isVisible && <div id={`propeller-${PROPELLER_ID}`} />}
    </div>
  );
}

/**
 * Adsterra ネイティブバナー広告
 * Zone ID を NEXT_PUBLIC_ADSTERRA_ID に設定して有効化
 */
export function AdsterraAd({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || loaded.current || !ADSTERRA_ID) return;
    loaded.current = true;
    const container = containerRef.current;
    if (!container) return;
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = `//www.highperformanceformat.com/${ADSTERRA_ID}/invoke.js`;
    container.appendChild(script);
  }, [isVisible]);

  if (!ADSTERRA_ID) return null;

  return (
    <div ref={containerRef} className={`ad-container my-6 ${className}`} style={{ minHeight: "250px" }}>
      <div className="text-[10px] text-muted/40 text-center mb-1 select-none">広告</div>
      {isVisible && <div id={`adsterra-${ADSTERRA_ID}`} />}
    </div>
  );
}

/**
 * AdMaven バナー広告
 * Site ID を NEXT_PUBLIC_ADMAVEN_ID に設定して有効化
 */
export function AdMavenAd({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || loaded.current || !ADMAVEN_ID) return;
    loaded.current = true;
    const container = containerRef.current;
    if (!container) return;
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = `//d3bch2djbkgold.cloudfront.net/tag.min.js`;
    script.setAttribute("data-zone", ADMAVEN_ID);
    container.appendChild(script);
  }, [isVisible]);

  if (!ADMAVEN_ID) return null;

  return (
    <div ref={containerRef} className={`ad-container my-6 ${className}`} style={{ minHeight: "250px" }}>
      <div className="text-[10px] text-muted/40 text-center mb-1 select-none">広告</div>
      {isVisible && <div id={`admaven-${ADMAVEN_ID}`} />}
    </div>
  );
}

/**
 * AdsKeeper ネイティブウィジェット広告
 * Widget ID を NEXT_PUBLIC_ADSKEEPER_WIDGET に設定して有効化
 */
export function AdsKeeperAd({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || loaded.current || !ADSKEEPER_WIDGET) return;
    loaded.current = true;
    const container = containerRef.current;
    if (!container) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://jsc.adskeeper.co.uk/f/m/${ADSKEEPER_WIDGET}.js`;
    container.appendChild(script);
  }, [isVisible]);

  if (!ADSKEEPER_WIDGET) return null;

  return (
    <div ref={containerRef} className={`ad-container my-6 ${className}`} style={{ minHeight: "300px" }}>
      <div className="text-[10px] text-muted/40 text-center mb-1 select-none">おすすめコンテンツ</div>
      {isVisible && <div id={`adskeeper-widget-${ADSKEEPER_WIDGET}`} />}
    </div>
  );
}

/**
 * ExoClick バナー広告
 * Zone ID を NEXT_PUBLIC_EXOCLICK_ID に設定して有効化
 */
export function ExoClickAd({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || loaded.current || !EXOCLICK_ID) return;
    loaded.current = true;
    const container = containerRef.current;
    if (!container) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://a.magsrv.com/ad-provider.js`;
    container.appendChild(script);
    const ins = document.createElement("ins");
    ins.className = "eas6a97888e";
    ins.setAttribute("data-zoneid", EXOCLICK_ID);
    container.appendChild(ins);
    const push = document.createElement("script");
    push.textContent = `(AdProvider = window.AdProvider || []).push({"serve": {}});`;
    container.appendChild(push);
  }, [isVisible]);

  if (!EXOCLICK_ID) return null;

  return (
    <div ref={containerRef} className={`ad-container my-6 ${className}`} style={{ minHeight: "250px" }}>
      <div className="text-[10px] text-muted/40 text-center mb-1 select-none">広告</div>
    </div>
  );
}

/**
 * 複数ネットワーク統合広告スロット
 * 設定されたネットワークの中から順番に1つ表示する。
 * AdSense > Adsterra > PropellerAds > AdMaven > ExoClick の優先順位。
 */
export function ThirdPartyAdSlot({ className = "", position = 0 }: { className?: string; position?: number }) {
  // 設定されているネットワーク数に応じてローテーション
  const networks: Array<{ id: string | undefined; Component: React.FC<{ className?: string }> }> = [
    { id: ADSTERRA_ID, Component: AdsterraAd },
    { id: PROPELLER_ID, Component: PropellerAd },
    { id: ADMAVEN_ID, Component: AdMavenAd },
    { id: EXOCLICK_ID, Component: ExoClickAd },
  ].filter(n => n.id);

  if (networks.length === 0) return null;

  // Rotate through available networks based on position
  const selected = networks[position % networks.length];
  const { Component } = selected;
  return <Component className={className} />;
}

/**
 * HilltopAds / PopAds — ポップアンダー型
 * これらはグローバルスクリプトとして layout.tsx で読み込む。
 * コンポーネントとしてのレンダリングは不要（自動ポップアンダー）。
 */
export function usePopunderNetworks() {
  // PopAds
  useEffect(() => {
    if (!POPADS_ID) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `//c1.popads.net/pop.js`;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);
    // Set popads config
    const config = document.createElement("script");
    config.textContent = `var defined_pop_under_config = { "id": "${POPADS_ID}" };`;
    document.head.appendChild(config);
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(config);
    };
  }, []);

  // HilltopAds
  useEffect(() => {
    if (!HILLTOP_ID) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `//www.cleverwebserver.com/${HILLTOP_ID}/invoke.js`;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
}
