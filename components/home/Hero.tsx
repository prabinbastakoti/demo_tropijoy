"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import HeroVisual from "@/components/home/HeroVisual";
import { getShoppableProducts } from "@/lib/products";

const shoppable = getShoppableProducts();
const avgRating =
  shoppable.reduce((sum, p) => sum + p.rating, 0) / shoppable.length;

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden -mt-[var(--header-h)] pt-[var(--header-h)]">
      <HeroVisual />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-sunny mb-6"
        >
          100% Natural &middot; Pure Goodness
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display font-extrabold text-5xl sm:text-7xl lg:text-display-lg text-white leading-[0.98] tracking-tight text-balance"
        >
          Pure joy,
          <br />
          in every{" "}
          <span className="relative inline-block text-sunny">
            bite
            <svg
              viewBox="0 0 200 20"
              className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-3 sm:h-4 text-sunny"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 14C40 4 90 2 100 8C110 14 160 16 198 6"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-7 text-base sm:text-lg text-white/75 max-w-md mx-auto leading-relaxed text-balance"
        >
          Real Nepali fruit, machine-sliced for precision and gently
          dehydrated in small batches. One ingredient on every label — no
          added sugar, no preservatives, no shortcuts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <ButtonLink href="/shop" size="lg">
            Shop All Products <ArrowRight size={18} />
          </ButtonLink>
          <ButtonLink
            href="/our-process"
            variant="outline"
            size="lg"
            className="border-white/50 text-white hover:bg-white hover:text-forest-deep"
          >
            Our Quality &amp; Process
          </ButtonLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex items-center justify-center gap-4 text-sm"
        >
          <span className="flex items-center gap-1.5 font-semibold text-white">
            <Star size={15} className="fill-sunny text-sunny" />
            {avgRating.toFixed(1)}
            <span className="font-normal text-white/60">
              &middot; 2,400+ happy customers
            </span>
          </span>
          <span className="hidden sm:block h-4 w-px bg-white/25" aria-hidden />
          <span className="hidden sm:block text-white/60">
            Free delivery over Rs. 3,000
          </span>
        </motion.div>
      </div>
    </section>
  );
}
