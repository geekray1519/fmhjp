import Link from "next/link";
import { Category } from "@/lib/types";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const totalResources = category.subcategories.reduce(
    (sum, sub) => sum + sub.resources.length, 0
  );

  return (
    <Link
      href={`/${category.slug}`}
      className="group relative block p-6 rounded-2xl border border-border bg-card hover:bg-card-hover overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${category.color}`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">{category.icon}</span>
          <ChevronRight
            size={18}
            className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
          />
        </div>
        <h3 className="font-bold text-base mb-1.5 group-hover:text-accent transition-colors">
          {category.title}
        </h3>
        <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3">
          {category.description}
        </p>
        <div className="flex items-center gap-3 text-[10px] font-medium text-muted">
          <span className="px-2 py-1 rounded-full bg-accent/10 text-accent">
            {totalResources} リソース
          </span>
          <span className="px-2 py-1 rounded-full bg-card">
            {category.subcategories.length} セクション
          </span>
        </div>
      </div>
    </Link>
  );
}
