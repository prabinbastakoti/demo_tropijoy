"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import ShopWindow from "@/components/home/ShopWindow";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-24 -mt-[var(--header-h)] pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="absolute -top-32 -left-32 w-[26rem] h-[26rem] rounded-full bg-forest/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-[22rem] h-[22rem] rounded-full bg-accent-apple/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-forest/10 px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-forest-deep">
              100% Natural &middot; No Preservatives &middot; Made with Love in Nepal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-display-lg text-forest-deep leading-[1.02] text-balance"
          >
            Pure Joy In Every <span className="text-accent-apple">Bite</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 text-base sm:text-lg text-forest-deep/65 max-w-xl mx-auto leading-relaxed text-balance"
          >
            Real Nepali fruit, gently dehydrated in small batches. One
            ingredient on every label — no sugar, no preservatives, no
            shortcuts. Start browsing right here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <ButtonLink href="/shop" size="lg">
              Shop All Products <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="/our-farms" variant="outline" size="lg">
              Our Farms &amp; Process
            </ButtonLink>
          </motion.div>
        </div>

        {/* the interactive shop window */}
        <ShopWindow />
      </div>
    </section>
  );
}
