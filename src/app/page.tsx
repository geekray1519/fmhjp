import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/CategoryCard";
import { AdBanner } from "@/components/AdBanner";
import { Search, BookOpen, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const totalResources = categories.reduce(
    (sum, cat) =>
      sum +
      cat.subcategories.reduce((s, sub) => s + sub.resources.length, 0),
    0
  );

  // Pick starred resources from across categories for the featured section
  const featuredResources = categories
    .flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        sub.resources
          .filter((r) => r.starred)
          .map((r) => ({ ...r, categoryTitle: cat.title, categorySlug: cat.slug, categoryIcon: cat.icon }))
      )
    )
    .slice(0, 8);

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
          <Link
            href="/beginners-guide"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium text-sm hover:bg-card transition-colors"
          >
            <BookOpen size={16} />
            初心者ガイド
          </Link>
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

      {/* Featured Resources */}
      <section className="pb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={20} className="text-accent" />
          <h2 className="text-xl font-bold">今週のおすすめ</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {featuredResources.map((resource, i) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-xs text-muted">{resource.categoryIcon} {resource.categoryTitle}</span>
              </div>
              <h3 className="font-semibold text-sm group-hover:text-accent transition-colors truncate">
                {resource.name}
              </h3>
              <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
                {resource.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <AdBanner slot="home-top" className="mb-8" />

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

      <AdBanner slot="home-bottom" className="mb-8" />
    </div>
  );
}
