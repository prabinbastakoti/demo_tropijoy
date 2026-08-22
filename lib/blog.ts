import blogData from "@/data/blog.json";
import faqData from "@/data/faq.json";
import type { BlogCategory, BlogPost, FaqCategory } from "./types";

export const posts = (blogData as BlogPost[])
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const faqCategories = faqData as FaqCategory[];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = posts.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  const others = posts.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Recipes",
  "Nutrition",
  "Behind the Scenes",
  "Guides",
];

/** Tailwind class sets keyed by a post's accent — replaces cover photography. */
export const accentStyles: Record<
  BlogPost["accent"],
  { gradient: string; chip: string; text: string }
> = {
  sunny: {
    gradient: "from-sunny/90 via-sunny-bright/70 to-citrus/40",
    chip: "bg-sunny text-forest-deep",
    text: "text-forest-deep",
  },
  forest: {
    gradient: "from-forest/90 via-forest-light/70 to-forest-deep/60",
    chip: "bg-forest text-white",
    text: "text-white",
  },
  berry: {
    gradient: "from-berry/85 via-berry/60 to-forest/40",
    chip: "bg-berry text-white",
    text: "text-white",
  },
  citrus: {
    gradient: "from-citrus/90 via-sunny/70 to-sunny-bright/50",
    chip: "bg-citrus text-white",
    text: "text-forest-deep",
  },
};
