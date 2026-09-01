// Shared TypeScript interfaces & Client API helpers for Blog System

export interface BlogSection {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogPostContent {
  intro: string;
  sections: BlogSection[];
  html?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content?: BlogPostContent;
  status?: string;
  shortDescription?: string;
  author?: string;
  featuredImageAlt?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  schemaMarkup?: string;
}

export interface SidebarCategory {
  name: string;
  count: number;
}

export interface PopularPost {
  id: number;
  title: string;
  date: string;
  image: string;
}

export const BLOG_CATEGORIES = [
  "All",
  "waste management",
  "Composting",
  "sustainability",
  "Carbon credits",
  "News & Updates",
];

export const SIDEBAR_CATEGORIES: SidebarCategory[] = [
  { name: "waste management", count: 2 },
  { name: "Composting", count: 1 },
  { name: "sustainability", count: 1 },
];

export const POPULAR_POSTS: PopularPost[] = [
  {
    id: 1,
    title: "Organic Waste Converter Compost Machine Price in India",
    date: "May 29, 2026",
    image: "/product/vikasit_chakra.png",
  },
  {
    id: 2,
    title: "Garbage free India",
    date: "March 7, 2025",
    image: "/project1.webp",
  },
  {
    id: 3,
    title: "How Plastic Waste Rules 2022 Fuel India’s Circular Economy",
    date: "April 7, 2025",
    image: "/project2.webp",
  },
];

export const BLOG_POSTS: BlogPost[] = [];

// Flexible slug query generator
export function buildSlugQuery(slugOrId: string) {
  const normalized = decodeURIComponent(slugOrId).trim().toLowerCase();
  const hyphenated = normalized.replace(/\s+/g, "-");
  const dehyphenated = normalized.replace(/-/g, " ");
  const isNumeric = !isNaN(Number(normalized));

  const queryOr: any[] = [
    { slug: normalized },
    { slug: hyphenated },
    { title: new RegExp(`^${dehyphenated}$`, "i") },
  ];

  if (isNumeric) {
    queryOr.push({ id: Number(normalized) });
  }

  return { $or: queryOr };
}

// Client-side API Fetchers

export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("/api/blogs", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    const data = await res.json();
    if (data.success && Array.isArray(data.posts)) {
      return data.posts;
    }
  } catch (e) {
    console.error("Client fetch error:", e);
  }
  return [];
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!slug) return undefined;
  try {
    const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
    const res = await fetch(`/api/blogs/${encodeURIComponent(normalizedSlug)}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.post) {
        return data.post;
      }
    }
  } catch (e) {
    console.error("Client single fetch error:", e);
  }
  return undefined;
}

export async function addBlogPostToDb(postData: Omit<BlogPost, "id"> & { id?: number }): Promise<BlogPost> {
  const nextId = postData.id || Date.now();
  const payload = {
    ...postData,
    id: nextId,
  };

  try {
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.post) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("vikasit_blogs_updated"));
        }
        return data.post;
      }
    }
  } catch (e) {
    console.error("Failed to save blog post to MongoDB API", e);
  }
  throw new Error("Failed to create blog post");
}

export async function updateBlogPostInDb(
  idOrSlug: number | string,
  updatedData: Partial<BlogPost>
): Promise<BlogPost | null> {
  try {
    const res = await fetch(`/api/blogs/${encodeURIComponent(String(idOrSlug))}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.post) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("vikasit_blogs_updated"));
        }
        return data.post;
      }
    }
  } catch (e) {
    console.error("Failed to update blog post in MongoDB API", e);
  }
  return null;
}

export async function deleteBlogPostFromDb(idOrSlug: number | string): Promise<boolean> {
  try {
    const res = await fetch(`/api/blogs/${encodeURIComponent(String(idOrSlug))}`, {
      method: "DELETE",
    });
    if (res.ok) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("vikasit_blogs_updated"));
      }
      return true;
    }
  } catch (e) {
    console.error("Failed to delete blog post from MongoDB API", e);
  }
  return false;
}

export function getRelatedPosts(currentSlug: string, count: number = 3, allPosts: BlogPost[] = []): BlogPost[] {
  const normalized = decodeURIComponent(currentSlug).toLowerCase();
  const filtered = allPosts.filter(
    (post) => post.slug.toLowerCase() !== normalized && post.slug.replace(/-/g, " ") !== normalized
  );
  return filtered.slice(0, count);
}
