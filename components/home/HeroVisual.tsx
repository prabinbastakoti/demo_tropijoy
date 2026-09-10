"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const floatingProducts = [
  { src: "/products/apple.png", alt: "Dried Apple", className: "top-[8%] left-[6%] w-20 sm:w-24", anim: "animate-float" },
  { src: "/products/orange.png", alt: "Dried Orange", className: "top-[6%] right-[8%] w-16 sm:w-20", anim: "animate-float-slow" },
  { src: "/products/banana.png", alt: "Dried Banana", className: "bottom-[10%] left-[10%] w-16 sm:w-20", anim: "animate-float-slow" },
  { src: "/products/banana-powder.png", alt: "Banana Powder", className: "bottom-[6%] right-[10%] w-20 sm:w-24", anim: "animate-float" },
];

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-window"
    >
      <Image
        src="/brand/mountain.png"
        alt="Nepali mountain origin"
        fill
        priority
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-forest-deep/10 to-transparent" />

      {floatingProducts.map((p) => (
        <div
          key={p.src}
          className={`absolute ${p.className} ${p.anim} drop-shadow-2xl`}
        >
          <div className="relative rounded-2xl bg-white/90 backdrop-blur-sm p-2 shadow-lift">
            <Image
              src={p.src}
              alt={p.alt}
              width={160}
              height={160}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      ))}

      <div className="absolute left-1/2 -translate-x-1/2 bottom-5 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 shadow-lift">
        <Leaf size={14} className="text-forest shrink-0" />
        <span className="text-xs font-semibold text-forest-deep whitespace-nowrap">
          Selected fruit, precision machine-sliced
        </span>
      </div>
    </motion.div>
  );
}
