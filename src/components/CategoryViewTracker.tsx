"use client";

import { useEffect } from "react";
import { trackCategoryView } from "./RecentlyViewed";

export function CategoryViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackCategoryView(slug);
  }, [slug]);

  return null;
}
