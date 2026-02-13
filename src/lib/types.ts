export interface Resource {
  name: string;
  url: string;
  description: string;
  starred?: boolean;
  tags?: string[];
  mirrors?: string[];
}

export interface SubCategory {
  id: string;
  title: string;
  description?: string;
  note?: string;
  resources: Resource[];
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  subcategories: SubCategory[];
}

export interface SearchResult {
  category: string;
  categorySlug: string;
  subcategory: string;
  resource: Resource;
}
