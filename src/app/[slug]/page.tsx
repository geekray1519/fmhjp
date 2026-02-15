import { notFound } from "next/navigation";
import { categories } from "@/data";
import { CategoryContent } from "@/components/CategoryContent";
import { ShareButton } from "@/components/ShareButton";
import { CategoryViewTracker } from "@/components/CategoryViewTracker";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { CategoryBreadcrumb } from "@/components/CategoryBreadcrumb";
import { ChevronRight, ChevronLeft, Home, Star, Sparkles } from "lucide-react";
import Link from "next/link";

// Related category mapping (manual curation for better cross-discovery)
const RELATED_MAP: Record<string, string[]> = {
  "ai": ["developer-tools", "text-tools", "image-tools"],
  "video": ["video-tools", "downloading", "torrenting"],
  "audio": ["video", "downloading", "misc"],
  "gaming": ["gaming-tools", "downloading", "torrenting"],
  "reading": ["educational", "text-tools", "non-english"],
  "downloading": ["torrenting", "video", "audio"],
  "torrenting": ["downloading", "video", "privacy"],
  "educational": ["reading", "ai", "developer-tools"],
  "mobile": ["system-tools", "gaming", "privacy"],
  "privacy": ["internet-tools", "system-tools", "mobile"],
  "linux-macos": ["system-tools", "developer-tools", "file-tools"],
  "non-english": ["reading", "educational", "misc"],
  "misc": ["internet-tools", "social-media-tools", "storage"],
  "system-tools": ["file-tools", "developer-tools", "linux-macos"],
  "file-tools": ["system-tools", "storage", "internet-tools"],
  "internet-tools": ["privacy", "social-media-tools", "system-tools"],
  "social-media-tools": ["internet-tools", "image-tools", "video-tools"],
  "text-tools": ["ai", "developer-tools", "educational"],
  "gaming-tools": ["gaming", "system-tools", "downloading"],
  "image-tools": ["video-tools", "ai", "social-media-tools"],
  "video-tools": ["video", "image-tools", "audio"],
  "developer-tools": ["ai", "text-tools", "system-tools"],
  "storage": ["file-tools", "system-tools", "internet-tools"],
  "unsafe": ["privacy", "downloading", "torrenting"],
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "見つかりません" };

  const totalResources = category.subcategories.reduce(
    (sum, sub) => sum + sub.resources.length,
    0
  );
  const fullDescription = `${category.description} — ${totalResources.toLocaleString()}件の無料リソースを日本語で紹介。`;

  return {
    title: category.title,
    description: fullDescription,
    openGraph: {
      title: `${category.title} - FMHJP`,
      description: fullDescription,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${category.title} - FMHJP`,
      description: fullDescription,
    },
    alternates: {
      canonical: `https://fmhyjp.vercel.app/${slug}`,
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

  const starredCount = category.subcategories.reduce(
    (sum, sub) => sum + sub.resources.filter((r) => r.starred).length,
    0
  );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: "https://fmhyjp.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.title,
        item: `https://fmhyjp.vercel.app/${category.slug}`,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ReadingProgressBar color={category.color} />
      <CategoryBreadcrumb title={category.title} icon={category.icon} />
      <CategoryViewTracker slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          ホーム
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{category.title}</span>
      </nav>

      <div className="mb-8 relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-8">
        <div className={`absolute inset-0 opacity-[0.04] bg-gradient-to-br ${category.color}`} />
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color}`} />
        {/* Decorative corner glow */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 opacity-[0.08] bg-gradient-to-br ${category.color} rounded-full blur-3xl`} />
        <div className="relative z-10">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3">
            <span className="text-4xl sm:text-5xl drop-shadow-sm">{category.icon}</span>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">{category.title}</h1>
              <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl line-clamp-2 leading-relaxed">{category.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-xs text-muted">
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent/10 text-accent font-medium">
              {totalResources.toLocaleString()} リソース
            </span>
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-background border border-border">
              {category.subcategories.length} セクション
            </span>
            {starredCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-500/10 text-amber-500 font-medium">
                <Star size={10} className="fill-amber-500" />
                {starredCount} おすすめ
              </span>
            )}
            <ShareButton title={`${category.title} - FMHJP`} />
          </div>
        </div>
      </div>

      <CategoryContent category={category} />

      {/* Related Categories */}
      {RELATED_MAP[slug] && (
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-accent" />
            <h2 className="text-sm font-semibold text-muted">関連カテゴリ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {RELATED_MAP[slug].map((relSlug) => {
              const rel = categories.find((c) => c.slug === relSlug);
              if (!rel) return null;
              const relCount = rel.subcategories.reduce((s, sub) => s + sub.resources.length, 0);
              return (
                <Link
                  key={rel.id}
                  href={`/${rel.slug}`}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-accent/30 hover:shadow-md transition-all"
                >
                  <span className="text-2xl shrink-0">{rel.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium group-hover:text-accent transition-colors truncate">
                      {rel.title}
                    </div>
                    <div className="text-[10px] text-muted">
                      {relCount.toLocaleString()} リソース
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 gap-4">
        {prevCategory ? (
          <Link
            href={`/${prevCategory.slug}`}
            className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/30 hover:bg-card hover:shadow-lg hover:shadow-accent/5 transition-all"
          >
            <ChevronLeft size={20} className="text-muted group-hover:text-accent transition-colors shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] text-muted uppercase tracking-wider">前のカテゴリ</div>
              <div className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                {prevCategory.icon} {prevCategory.title}
              </div>
              <div className="text-[10px] text-muted/60 mt-0.5">
                {prevCategory.subcategories.reduce((s, sub) => s + sub.resources.length, 0).toLocaleString()} リソース
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextCategory ? (
          <Link
            href={`/${nextCategory.slug}`}
            className="group flex items-center justify-end gap-3 p-4 rounded-xl border border-border hover:border-accent/30 hover:bg-card hover:shadow-lg hover:shadow-accent/5 transition-all text-right"
          >
            <div className="min-w-0">
              <div className="text-[10px] text-muted uppercase tracking-wider">次のカテゴリ</div>
              <div className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                {nextCategory.icon} {nextCategory.title}
              </div>
              <div className="text-[10px] text-muted/60 mt-0.5">
                {nextCategory.subcategories.reduce((s, sub) => s + sub.resources.length, 0).toLocaleString()} リソース
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
