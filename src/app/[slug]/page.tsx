import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { ResourceCard } from "@/components/ResourceCard";
import { AdBanner } from "@/components/AdBanner";
import { ChevronRight, Home } from "lucide-react";
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
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const totalResources = category.subcategories.reduce(
    (sum, sub) => sum + sub.resources.length,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home size={14} />
          ホーム
        </Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{category.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
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

      {/* Subcategories */}
      <div className="space-y-10">
        {category.subcategories.map((sub, i) => (
          <section key={sub.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="mb-4">
              <h2 className="text-xl font-bold">{sub.title}</h2>
              {sub.note && (
                <div className="mt-2 p-3 rounded-lg bg-accent/5 border border-accent/10 text-xs text-muted leading-relaxed">
                  {sub.note}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sub.resources.map((resource) => (
                <ResourceCard key={resource.name} resource={resource} />
              ))}
            </div>

            {i === 1 && <AdBanner slot="category-mid" className="mt-6" />}
          </section>
        ))}
      </div>
    </div>
  );
}
