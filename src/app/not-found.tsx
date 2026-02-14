import Link from "next/link";
import { Home, Search, BookOpen } from "lucide-react";
import { categories } from "@/data";

export default function NotFound() {
  // Top 8 categories by resource count
  const popular = [...categories]
    .map((cat) => ({
      ...cat,
      count: cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <div className="relative inline-block mb-8">
        <div className="text-8xl font-bold gradient-text animate-fade-in">404</div>
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-2xl -z-10" />
      </div>
      <h1 className="text-3xl font-bold mb-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
        ページが見つかりません
      </h1>
      <p className="text-muted mb-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
        お探しのページは存在しないか、移動された可能性があります。
        下のリンクからお探しのコンテンツを見つけてください。
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/25"
        >
          <Home size={16} />
          ホームに戻る
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium text-sm hover:bg-card transition-colors"
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
      </div>

      {/* Popular categories */}
      <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
        <p className="text-sm font-medium text-muted mb-4">人気カテゴリから探す</p>
        <div className="flex flex-wrap justify-center gap-2">
          {popular.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl bg-card border border-border hover:bg-card-hover hover:border-accent/30 transition-all"
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
              <span className="text-[10px] text-muted">({cat.count})</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
