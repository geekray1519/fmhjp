import { categories } from "@/data";
import type { MetadataRoute } from "next";

// Build-time date — updates on each deploy (monthly via GitHub Actions)
const BUILD_DATE = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fmhyjp.vercel.app";

  const categoryPages = categories.map((cat) => {
    const resourceCount = cat.subcategories.reduce(
      (sum, sub) => sum + sub.resources.length,
      0
    );
    return {
      url: `${baseUrl}/${cat.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      // Higher priority for categories with more resources
      priority: Math.min(0.9, 0.6 + (resourceCount / 5000) * 0.3),
    };
  });

  const staticPages = [
    { path: "", priority: 1, changeFrequency: "daily" as const },
    { path: "/search", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/beginners-guide", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/bookmarks", priority: 0.4, changeFrequency: "monthly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: BUILD_DATE,
    changeFrequency,
    priority,
  }));

  return [...staticPages, ...categoryPages];
}
