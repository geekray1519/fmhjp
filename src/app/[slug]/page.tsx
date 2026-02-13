import { notFound } from "next/navigation";
import { categories } from "@/data";
import { CategoryContent } from "@/components/CategoryContent";
import { AdBanner } from "@/components/AdBanner";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "見つかりません - FMHJP" };
  return {
    title: `${category.title} - FMHJP`,
    description: category.description,
    openGraph: {
      title: `${category.title} - FMHJP`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryIndex = categories.findIndex((c) => c.slug === slug);
  const category = categories[categoryIndex];

  if (!category) {
    notFound();
  }

  const prevCategory = categoryIndex > 0 ? categories[categoryIndex - 1] : null;
  const nextCategory = categoryIndex < categories.length - 1 ? categories[categoryIndex + 1] : null;

  const totalResources = category.subcategories.reduce(
    (sum, sub) => sum + sub.resources.length,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          ホーム
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{category.title}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{category.title}</h1>
            <p className="text-sm text-muted mt-1">{category.description}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4 text-xs text-muted">
          <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium">
            {totalResources} リソース
          </span>
          <span className="px-3 py-1.5 rounded-full bg-card border border-border">
            {category.subcategories.length} セクション
          </span>
        </div>
      </div>

      <CategoryContent category={category} />

      <AdBanner className="mt-8" />

      {/* Prev / Next navigation */}
      <div className="mt-12 pt-8 border-t border-border grid grid-cols-2 gap-4">
        {prevCategory ? (
          <Link
            href={`/${prevCategory.slug}`}
            className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/30 hover:bg-card transition-all"
          >
            <ChevronLeft size={20} className="text-muted group-hover:text-accent transition-colors shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-muted uppercase tracking-wider">前のカテゴリ</div>
              <div className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                {prevCategory.icon} {prevCategory.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextCategory ? (
          <Link
            href={`/${nextCategory.slug}`}
            className="group flex items-center justify-end gap-3 p-4 rounded-xl border border-border hover:border-accent/30 hover:bg-card transition-all text-right"
          >
            <div className="min-w-0">
              <div className="text-[10px] text-muted uppercase tracking-wider">次のカテゴリ</div>
              <div className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                {nextCategory.icon} {nextCategory.title}
              </div>
            </div>
            <ChevronRight size={20} className="text-muted group-hover:text-accent transition-colors shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
