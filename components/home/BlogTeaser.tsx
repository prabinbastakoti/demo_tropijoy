import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { posts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";
import Reveal from "@/components/motion/Reveal";

export default function BlogTeaser() {
  const latest = posts.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <span className="inline-block text-xs font-bold tracking-[0.18em] text-forest uppercase mb-3">
            From the journal
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-deep">
            Things worth knowing
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:gap-3 transition-all"
        >
          All articles <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {latest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
