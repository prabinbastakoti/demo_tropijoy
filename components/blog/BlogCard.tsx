import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { accentStyles } from "@/lib/blog";
import { cn, formatDate } from "@/lib/utils";

/**
 * Posts have no cover photography — the gradient panel keyed off `accent`
 * carries the visual weight instead.
 */
export default function BlogCard({
  post,
  size = "md",
}: {
  post: BlogPost;
  size?: "md" | "lg";
}) {
  const accent = accentStyles[post.accent];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white border border-forest/10 hover:shadow-lift transition-shadow"
    >
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br p-6 flex flex-col justify-between",
          accent.gradient,
          size === "lg" ? "min-h-[220px]" : "min-h-[160px]"
        )}
      >
        <div className="absolute inset-0 dotted-grid opacity-20" />
        <div className="relative flex items-start justify-between gap-3">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
              accent.chip
            )}
          >
            {post.category}
          </span>
          <ArrowUpRight
            size={20}
            className={cn(
              "shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1",
              accent.text
            )}
          />
        </div>
        <h3
          className={cn(
            "relative font-display font-extrabold leading-tight text-balance mt-6",
            accent.text,
            size === "lg" ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          {post.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-forest-deep/65 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 pt-4 border-t border-forest/8 flex items-center justify-between text-xs text-forest-deep/45">
          <span className="truncate">{post.author}</span>
          <span className="flex items-center gap-3 shrink-0">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> {post.readTime}m
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
