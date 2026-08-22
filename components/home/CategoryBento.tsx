"use client";

import Link from "next/link";
import { ArrowUpRight, Leaf, Sparkles, Sprout, Sun } from "lucide-react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";
import Spotlight from "@/components/motion/Spotlight";
import CountUp from "@/components/motion/CountUp";

export default function CategoryBento() {
  const cheapest = Math.min(...products.map((p) => p.price));
  const driedCount = products.filter(
    (p) => p.category === "Dehydrated Fruit"
  ).length;
  const powderCount = products.filter(
    (p) => p.category === "Fruit Powder"
  ).length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="bento">
        {/* dried fruits */}
        <Reveal className="md:col-span-2 md:row-span-2">
          <Spotlight className="h-full">
            <Link
              href="/shop"
              className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-forest via-forest-light to-forest-deep p-7 text-white"
            >
              <div className="absolute inset-0 dotted-grid opacity-[0.15]" />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <Leaf size={12} /> {driedCount} products
                </span>
                <h3 className="mt-5 font-display text-3xl sm:text-4xl font-extrabold leading-tight">
                  Dehydrated
                  <br />
                  Fruit Slices
                </h3>
                <p className="mt-3 max-w-xs text-sm text-white/70 leading-relaxed">
                  Low-temperature dried over 8–14 hours. Dense, chewy and
                  intensely flavoured — nothing added.
                </p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sunny">
                Browse slices
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </Link>
          </Spotlight>
        </Reveal>

        {/* powders */}
        <Reveal delay={0.06} className="md:col-span-2">
          <Spotlight className="h-full">
            <Link
              href="/shop"
              className="group relative flex h-full min-h-[130px] items-center justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-sunny via-sunny-bright to-citrus/70 p-6 text-forest-deep"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-deep/10 px-3 py-1 text-xs font-semibold">
                  <Sparkles size={12} /> {powderCount} products
                </span>
                <h3 className="mt-3 font-display text-2xl font-extrabold">
                  Superfood Powders
                </h3>
                <p className="mt-1 text-sm text-forest-deep/70">
                  Freeze-dried, milled, vivid.
                </p>
              </div>
              <ArrowUpRight
                size={22}
                className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </Spotlight>
        </Reveal>

        {/* stat */}
        <Reveal delay={0.12}>
          <div className="flex h-full min-h-[130px] flex-col justify-center rounded-3xl bg-white border border-forest/10 p-6">
            <Sun size={20} className="text-sunny-dark mb-2" />
            <p className="font-display text-3xl font-extrabold text-forest-deep">
              <CountUp to={11} />
            </p>
            <p className="text-xs text-forest-deep/55 mt-1 leading-snug">
              partner farms across Nepal
            </p>
          </div>
        </Reveal>

        {/* price */}
        <Reveal delay={0.18}>
          <div className="flex h-full min-h-[130px] flex-col justify-center rounded-3xl bg-forest-deep p-6 text-cream">
            <Sprout size={20} className="text-sunny mb-2" />
            <p className="font-display text-2xl font-extrabold">
              From {formatPrice(cheapest)}
            </p>
            <p className="text-xs text-cream/55 mt-1 leading-snug">
              free delivery over Rs. 3,000
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
