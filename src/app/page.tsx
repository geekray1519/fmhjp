import { categories } from "@/data";
import { CategoryCard } from "@/components/CategoryCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { AdBanner, InFeedAd } from "@/components/AdBanner";
import { Search, BookOpen, Star, TrendingUp, Sparkles, Zap, Shield, Globe, Lightbulb, Keyboard, Command, Shuffle } from "lucide-react";
import Link from "next/link";

const DAILY_TIPS = [
  { tip: "Ctrl+K でコマンドパレットを開いて素早く検索できます", icon: "keyboard" },
  { tip: "? キーでキーボードショートカット一覧を表示できます", icon: "keyboard" },
  { tip: "リソースカードの右上にあるブックマークアイコンで保存できます", icon: "bookmark" },
  { tip: "おすすめリソースには⭐マークがついています", icon: "star" },
  { tip: "カテゴリページの目次から素早くセクションに移動できます", icon: "navigate" },
  { tip: "検索ページで / キーを押すと検索入力にフォーカスします", icon: "search" },
  { tip: "ミラーリンクがあるリソースは代替URLからもアクセスできます", icon: "link" },
  { tip: "ダークモード/ライトモードはヘッダーの月/太陽アイコンで切替", icon: "theme" },
  { tip: "毎月自動で最新のリソース情報に更新されます", icon: "update" },
  { tip: "URLコピーボタンでリソースのリンクを簡単に共有できます", icon: "share" },
];

export default function Home() {
  const totalResources = categories.reduce(
    (sum, cat) =>
      sum +
      cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0),
    0
  );

  const totalSubcategories = categories.reduce(
    (sum, cat) => sum + cat.subcategories.length,
    0
  );

  const starredTotal = categories.reduce(
    (sum, cat) =>
      sum +
      cat.subcategories.reduce(
        (s, sub) => s + sub.resources.filter((r) => r.starred).length,
        0
      ),
    0
  );

  // Pick starred resources from across categories for the featured section
  const allStarred = categories
    .flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        sub.resources
          .filter((r) => r.starred)
          .map((r) => ({ ...r, categoryTitle: cat.title, categorySlug: cat.slug, categoryIcon: cat.icon }))
      )
    );

  // Deterministic pseudo-random selection based on day of year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const shuffled = allStarred.sort((a, b) => {
    const ha = (a.name.charCodeAt(0) * 31 + dayOfYear) % 1000;
    const hb = (b.name.charCodeAt(0) * 31 + dayOfYear) % 1000;
    return ha - hb;
  });
  const featuredResources = shuffled.slice(0, 12);

  // Random category for "discover" button
  const randomCategory = categories[dayOfYear % categories.length];

  // Top categories by resource count
  const popularCategories = [...categories]
    .map((cat) => ({
      ...cat,
      resourceCount: cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0),
    }))
    .sort((a, b) => b.resourceCount - a.resourceCount)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-16 sm:py-24 text-center relative overflow-hidden rounded-3xl animate-gradient-mesh -mx-2 px-2">
        {/* Background glow effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-pink-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium mb-6 border border-accent/20">
            <Zap size={12} />
            毎月自動更新 — 常に最新のリソース
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
            <span className="gradient-text">FMHJP</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            インターネット上の無料リソースを集めた
            <br className="hidden sm:block" />
            日本最大級のコレクション
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/25"
          >
            <Search size={16} />
            リソースを検索
          </Link>
          <Link
            href="/beginners-guide"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium text-sm hover:bg-card transition-colors"
          >
            <BookOpen size={16} />
            初心者ガイド
          </Link>
          <Link
            href={`/${randomCategory.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium text-sm hover:bg-card transition-colors"
          >
            <Shuffle size={16} />
            {randomCategory.icon} ランダム探索
          </Link>
        </div>

        {/* Animated Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="p-4 rounded-2xl bg-card/50 border border-border">
            <AnimatedCounter end={categories.length} duration={1200} className="text-2xl sm:text-3xl font-bold gradient-text" />
            <div className="text-xs text-muted mt-1">カテゴリ</div>
          </div>
          <div className="p-4 rounded-2xl bg-card/50 border border-border">
            <AnimatedCounter end={totalResources} duration={2000} suffix="+" className="text-2xl sm:text-3xl font-bold gradient-text" />
            <div className="text-xs text-muted mt-1">リソース</div>
          </div>
          <div className="p-4 rounded-2xl bg-card/50 border border-border">
            <AnimatedCounter end={totalSubcategories} duration={1800} suffix="+" className="text-2xl sm:text-3xl font-bold gradient-text" />
            <div className="text-xs text-muted mt-1">セクション</div>
          </div>
          <div className="p-4 rounded-2xl bg-card/50 border border-border">
            <AnimatedCounter end={starredTotal} duration={1600} suffix="+" className="text-2xl sm:text-3xl font-bold gradient-text" />
            <div className="text-xs text-muted mt-1">おすすめ</div>
          </div>
        </div>

        {/* Feature badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "450ms" }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs text-muted">
            <Shield size={12} className="text-emerald-500" />
            安全なリソースのみ
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs text-muted">
            <Globe size={12} className="text-blue-500" />
            完全日本語対応
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs text-muted">
            <Star size={12} className="text-amber-500" />
            厳選おすすめ付き
          </div>
        </div>
      </section>

      {/* Daily Tip Banner */}
      <section className="pb-8">
        <div className="p-4 rounded-2xl border border-accent/20 bg-accent/5 flex items-start sm:items-center gap-3 animate-fade-in">
          <div className="p-2 rounded-xl bg-accent/10 shrink-0">
            <Lightbulb size={18} className="text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
              今日のヒント
            </span>
            <p className="text-sm text-foreground mt-0.5">
              {DAILY_TIPS[dayOfYear % DAILY_TIPS.length].tip}
            </p>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Featured Resources */}
      <section className="pb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={20} className="text-accent" />
          <h2 className="text-xl font-bold">おすすめリソース</h2>
          <span className="text-xs text-muted ml-auto">{allStarred.length}件のおすすめから厳選</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {featuredResources.map((resource, i) => {
            let domain = "";
            try { domain = new URL(resource.url).hostname.replace(/^www\./, ""); } catch { /* */ }
            return (
              <a
                key={resource.name + resource.categorySlug}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 card-lift animate-fade-in starred-glow"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 text-[10px] text-accent font-medium">
                    {resource.categoryIcon} {resource.categoryTitle}
                  </span>
                  <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  {domain && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                      alt=""
                      className="favicon-img shrink-0"
                      loading="lazy"
                      width={14}
                      height={14}
                    />
                  )}
                  <h3 className="font-semibold text-sm group-hover:text-accent transition-colors truncate">
                    {resource.name}
                  </h3>
                </div>
                {resource.description && (
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {resource.description}
                  </p>
                )}
                {domain && (
                  <p className="mt-2 text-[10px] text-muted/60 truncate">{domain}</p>
                )}
              </a>
            );
          })}
        </div>
      </section>

      <InFeedAd className="mb-8" />

      {/* Popular Categories */}
      <section className="pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-accent" />
            <h2 className="text-xl font-bold">人気カテゴリ</h2>
          </div>
          <Link href="#categories" className="text-xs text-muted hover:text-accent transition-colors">
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {popularCategories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group text-center p-4 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="text-xs font-medium group-hover:text-accent transition-colors truncate">{cat.title}</div>
              <div className="text-[10px] text-muted mt-1">{cat.resourceCount.toLocaleString()} リソース</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Keyboard Shortcuts Hints */}
      <section className="pb-12">
        <div className="flex items-center gap-2 mb-4">
          <Keyboard size={20} className="text-accent" />
          <h2 className="text-xl font-bold">キーボードショートカット</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-border bg-card flex items-center gap-3">
            <div className="flex items-center gap-1 shrink-0">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-background border border-border rounded">
                <Command size={10} className="inline -mt-0.5" />
              </kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-background border border-border rounded">K</kbd>
            </div>
            <span className="text-xs text-muted">検索を開く</span>
          </div>
          <div className="p-3 rounded-xl border border-border bg-card flex items-center gap-3">
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-background border border-border rounded shrink-0">/</kbd>
            <span className="text-xs text-muted">検索にフォーカス</span>
          </div>
          <div className="p-3 rounded-xl border border-border bg-card flex items-center gap-3">
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-background border border-border rounded shrink-0">?</kbd>
            <span className="text-xs text-muted">ショートカット一覧</span>
          </div>
          <div className="p-3 rounded-xl border border-border bg-card flex items-center gap-3">
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-background border border-border rounded shrink-0">Esc</kbd>
            <span className="text-xs text-muted">モーダルを閉じる</span>
          </div>
        </div>
      </section>

      <AdBanner className="mb-8" />

      <section id="categories" className="pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">全カテゴリ一覧</h2>
          <span className="text-xs text-muted">{categories.length} カテゴリ</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
