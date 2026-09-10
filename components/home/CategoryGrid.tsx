"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Leaf, Sprout, Sun } from "lucide-react";
import { products, priceFrom, FRUIT_ACCENTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CategoryGrid() {
  const cheapest = Math.min(...products.map(priceFrom));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <SectionHeading
        align="left"
        eyebrow="Our collection"
        title="Shop by Fruit"
        description="Six fruits, dried the same honest way — nothing added, nothing hidden."
        className="mb-10"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
        {products.map((product, i) => {
          const accent = FRUIT_ACCENTS[product.fruitType];
          return (
            <Reveal key={product.id} delay={Math.min(i * 0.05, 0.3)}>
              <Link
                href={`/shop/${product.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-forest/10 hover:shadow-lift hover:-translate-y-1 transition-all duration-300"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: accent.hex }}
                />
                <div className="relative aspect-square bg-cream">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-forest-deep leading-tight">
                    {product.name}
                  </h3>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-forest-deep/70">
                      From {formatPrice(priceFrom(product))}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-forest-deep/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 rounded-3xl bg-white border border-forest/10 p-5">
            <div className="w-11 h-11 rounded-2xl bg-forest/8 flex items-center justify-center shrink-0">
              <Sun size={20} className="text-forest" />
            </div>
            <div>
              <p className="font-display font-extrabold text-2xl text-forest-deep leading-none">
                <CountUp to={11} />
              </p>
              <p className="text-xs text-forest-deep/55 mt-1">partner farms across Nepal</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-white border border-forest/10 p-5">
            <div className="w-11 h-11 rounded-2xl bg-forest/8 flex items-center justify-center shrink-0">
              <Leaf size={20} className="text-forest" />
            </div>
            <div>
              <p className="font-display font-extrabold text-2xl text-forest-deep leading-none">
                {products.length}
              </p>
              <p className="text-xs text-forest-deep/55 mt-1">real products, one ingredient each</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-forest-deep p-5 text-cream">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Sprout size={20} className="text-sunny" />
            </div>
            <div>
              <p className="font-display font-extrabold text-2xl leading-none">
                From {formatPrice(cheapest)}
              </p>
              <p className="text-xs text-cream/60 mt-1">free delivery over Rs. 3,000</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
