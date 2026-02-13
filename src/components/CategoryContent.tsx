"use client";

import { useState } from "react";
import { Category } from "@/lib/types";
import { ResourceCard } from "@/components/ResourceCard";
import { AdBanner } from "@/components/AdBanner";
import { Star, Filter } from "lucide-react";

interface CategoryContentProps {
  category: Category;
}

export function CategoryContent({ category }: CategoryContentProps) {
  const [starredOnly, setStarredOnly] = useState(false);

  const totalResources = category.subcategories.reduce(
    (sum, sub) => sum + sub.resources.length,
    0
  );
  const starredCount = category.subcategories.reduce(
    (sum, sub) => sum + sub.resources.filter((r) => r.starred).length,
    0
  );

  return (
    <>
      {/* Quick nav */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setStarredOnly(!starredOnly)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            starredOnly
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              : "bg-card border border-border hover:border-amber-500/30 text-muted hover:text-amber-400"
          }`}
        >
          <Star size={12} className={starredOnly ? "fill-amber-400" : ""} />
          おすすめのみ ({starredCount})
        </button>
        <span className="text-xs text-muted">
          <Filter size={12} className="inline mr-1" />
          {starredOnly ? starredCount : totalResources} リソース表示中
        </span>
      </div>

      {/* Subcategory nav */}
      <div className="mb-8 flex flex-wrap gap-2">
        {category.subcategories.map((sub) => (
          <a
            key={sub.id}
            href={`#${sub.id}`}
            className="px-3 py-1.5 text-xs rounded-lg bg-card border border-border hover:border-accent/30 hover:text-accent transition-all"
          >
            {sub.title}
          </a>
        ))}
      </div>

      {/* Subcategories */}
      <div className="space-y-10">
        {category.subcategories.map((sub, i) => {
          const filteredResources = starredOnly
            ? sub.resources.filter((r) => r.starred)
            : sub.resources;

          if (filteredResources.length === 0) return null;

          return (
            <section
              key={sub.id}
              id={sub.id}
              className="animate-fade-in scroll-mt-20"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold">{sub.title}</h2>
                {sub.description && (
                  <p className="mt-1 text-sm text-muted">{sub.description}</p>
                )}
                {sub.note && (
                  <div className="mt-2 p-3 rounded-lg bg-accent/5 border border-accent/10 text-xs text-muted leading-relaxed">
                    {sub.note}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.name} resource={resource} />
                ))}
              </div>

              {i === 1 && <AdBanner slot="category-mid" className="mt-6" />}
            </section>
          );
        })}
      </div>
    </>
  );
}
