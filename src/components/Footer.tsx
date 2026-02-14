import Link from "next/link";
import { categories } from "@/data";
import { Heart, ArrowUp, Zap } from "lucide-react";

export function Footer() {
  const totalResources = categories.reduce(
    (sum, cat) => sum + cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0),
    0
  );
  const totalSubcategories = categories.reduce(
    (sum, cat) => sum + cat.subcategories.length,
    0
  );

  // Popular categories for footer (top 8 by resource count)
  const topCategories = [...categories]
    .map((cat) => ({
      slug: cat.slug,
      title: cat.title,
      icon: cat.icon,
      count: cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <footer className="mt-16 gradient-top-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats banner */}
        <div className="mb-10 p-4 rounded-2xl bg-accent/5 border border-accent/10 flex flex-wrap items-center justify-center gap-6 text-center">
          <div>
            <div className="text-lg font-bold text-accent">{categories.length}</div>
            <div className="text-[10px] text-muted">カテゴリ</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <div className="text-lg font-bold text-accent">{totalResources.toLocaleString()}+</div>
            <div className="text-[10px] text-muted">リソース</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <div className="text-lg font-bold text-accent">{totalSubcategories}+</div>
            <div className="text-[10px] text-muted">セクション</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-1.5">
            <Zap size={14} className="text-accent" />
            <div className="text-[10px] text-muted">毎月自動更新</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <span className="text-xl font-bold gradient-text">FMHJP</span>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              インターネット上の無料リソースを日本語で紹介する最大級のキュレーションサイト。
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3 text-foreground">ナビゲーション</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/" className="link-underline hover:text-accent transition-colors">ホーム</Link></li>
              <li><Link href="/search" className="link-underline hover:text-accent transition-colors">検索</Link></li>
              <li><Link href="/bookmarks" className="link-underline hover:text-accent transition-colors">ブックマーク</Link></li>
              <li><Link href="/beginners-guide" className="link-underline hover:text-accent transition-colors">初心者ガイド</Link></li>
              <li><Link href="/about" className="link-underline hover:text-accent transition-colors">このサイトについて</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3 text-foreground">人気カテゴリ</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              {topCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} className="link-underline hover:text-accent transition-colors inline-flex items-center gap-1.5">
                    <span className="text-xs">{cat.icon}</span>
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3 text-foreground">法的情報</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/privacy-policy" className="link-underline hover:text-accent transition-colors">プライバシーポリシー</Link></li>
              <li><Link href="/terms" className="link-underline hover:text-accent transition-colors">利用規約</Link></li>
              <li><Link href="/contact" className="link-underline hover:text-accent transition-colors">お問い合わせ</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p className="inline-flex items-center gap-1">
            &copy; {new Date().getFullYear()} FMHJP
            <Heart size={10} className="text-pink-500 fill-pink-500" />
            無料リソースの日本語キュレーション
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[10px]">データは毎月1日に自動更新されます</p>
            <a
              href="#main-content"
              className="inline-flex items-center gap-1 text-[10px] text-muted hover:text-accent transition-colors"
              aria-label="ページトップへ"
            >
              <ArrowUp size={10} />
              トップへ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
