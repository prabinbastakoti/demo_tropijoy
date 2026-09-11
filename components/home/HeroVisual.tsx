"use client";

import { motion } from "framer-motion";

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="relative aspect-square sm:aspect-[6/5] rounded-[2rem] overflow-hidden shadow-window"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/products/apple.png"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}
