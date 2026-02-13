import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/CategoryCard";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const totalResources = categories.reduce(
    (sum, cat) =>
      sum +
      cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-16 sm:py-24 text-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-pink-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
            <span className="gradient-text">FMHJP</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            インターネット上の無料リソースを集めた
            <br className="hidden sm:block" />
            最大のコレクション
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Search size={16} />
            リソースを検索
          </Link>
          <a
            href="#categories"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium text-sm hover:bg-card transition-colors"
          >
            カテゴリを見る
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 sm:gap-16 text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div>
            <div className="text-2xl sm:text-3xl font-bold gradient-text">{categories.length}</div>
            <div className="text-xs text-muted mt-1">カテゴリ</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <div className="text-2xl sm:text-3xl font-bold gradient-text">{totalResources}+</div>
            <div className="text-xs text-muted mt-1">リソース</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <div className="text-2xl sm:text-3xl font-bold gradient-text">毎日</div>
            <div className="text-xs text-muted mt-1">更新</div>
          </div>
        </div>
      </section>

      <section id="categories" className="pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">カテゴリ一覧</h2>
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
