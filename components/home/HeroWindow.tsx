"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Lock, Plus, Search, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { products } from "@/lib/products";
import { formatPrice, calculateDiscount, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";
import type { FruitType, Product } from "@/lib/types";
import { useCartStore, useCartTotals } from "@/store/cart-store";
import { useHydrated } from "@/lib/use-hydrated";

const tabs = [
  { id: "all", label: "All" },
  { id: "slices", label: "Dried Fruits" },
  { id: "powders", label: "Powders" },
  { id: "mixes", label: "Snack Mixes" },
  { id: "top", label: "Best Sellers" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const fruitFilters: (FruitType | "All")[] = [
  "All",
  "Mango",
  "Berry",
  "Dragonfruit",
  "Pineapple",
  "Citrus",
];

/** The window reserves this many card slots so its height never changes between tabs. */
const GRID_SLOTS = 6;

function selectProducts(tab: TabId, fruit: FruitType | "All"): Product[] {
  let list = products;
  if (tab === "slices")
    list = list.filter(
      (p) => p.category === "Dehydrated Fruit" && !p.tags.includes("Snack Mix")
    );
  if (tab === "powders")
    list = list.filter(
      (p) => p.category === "Fruit Powder" && !p.tags.includes("Snack Mix")
    );
  if (tab === "mixes") list = list.filter((p) => p.tags.includes("Snack Mix"));
  if (tab === "top") list = list.filter((p) => p.tags.includes("Best Seller"));
  if (fruit !== "All") list = list.filter((p) => p.fruitType === fruit);
  return list.slice(0, GRID_SLOTS);
}

export default function HeroWindow() {
  const [tab, setTab] = useState<TabId>("all");
  const [fruit, setFruit] = useState<FruitType | "All">("All");
  const addItem = useCartStore((s) => s.addItem);
  const { itemCount } = useCartTotals();
  const hydrated = useHydrated();
  const reduce = useReducedMotion();

  const visible = useMemo(() => selectProducts(tab, fruit), [tab, fruit]);

  function handleAdd(e: React.MouseEvent, product: Product) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
    toast.success(`${product.name} added to cart`);
  }

  return (
    <section className="mesh-hero noise relative overflow-hidden pb-20 sm:pb-24 -mt-[var(--header-h)] pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-forest/10 px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-forest-deep">
              100% Organic &middot; No Added Sugar &middot; Made in Nepal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-display-lg text-forest-deep leading-[1.02] text-balance"
          >
            Pure Joy In Every{" "}
            <span className="text-gradient-brand">Bite</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 text-base sm:text-lg text-forest-deep/65 max-w-xl mx-auto leading-relaxed text-balance"
          >
            Sun-ripened fruit, gently dehydrated in small batches. No sugar, no
            sulphites, no shortcuts — start browsing right here.
          </motion.p>
        </div>

        {/* the window */}
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.96, rotateX: reduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1200 }}
          className="rounded-[1.75rem] bg-white/95 backdrop-blur-xl border border-forest/10 shadow-window overflow-hidden"
        >
          {/* chrome */}
          <div className="flex items-center gap-3 px-4 sm:px-5 py-3 bg-gradient-to-b from-gray-50 to-white border-b border-forest/10">
            <div className="flex items-center gap-2 shrink-0">
              {["bg-red-400", "bg-sunny", "bg-forest-light"].map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06, type: "spring", stiffness: 400 }}
                  className={`w-3 h-3 rounded-full ${c}`}
                />
              ))}
            </div>

            <div className="hidden sm:flex flex-1 items-center justify-center">
              <div className="flex items-center gap-2 rounded-full bg-forest/5 px-4 py-1.5 text-xs text-forest-deep/50 min-w-[220px] justify-center">
                <Lock size={11} />
                tropijoy.np/shop
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto sm:ml-0 shrink-0">
              <span className="hidden sm:flex items-center gap-1 text-[11px] text-forest-deep/40 border border-forest/10 rounded-md px-1.5 py-0.5">
                <Search size={10} /> ⌘K
              </span>
              <span className="relative inline-flex items-center gap-1.5 text-xs font-semibold text-forest">
                <ShoppingBag size={15} />
                {hydrated && itemCount > 0 && (
                  <span className="bg-sunny text-forest-deep rounded-full px-1.5 text-[10px] font-bold">
                    {itemCount}
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* tabs */}
          <div className="flex items-center gap-1 px-3 sm:px-5 py-2.5 border-b border-forest/8 overflow-x-auto no-scrollbar">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                  tab === t.id
                    ? "text-forest-deep"
                    : "text-forest-deep/45 hover:text-forest-deep/75"
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="hero-tab-pill"
                    className="absolute inset-0 bg-sunny rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-[150px_1fr]">
            {/* fruit rail */}
            <div className="border-b md:border-b-0 md:border-r border-forest/8 p-3 sm:p-4">
              <p className="hidden md:block text-[10px] font-bold uppercase tracking-wider text-forest-deep/35 mb-2 px-2">
                Fruit
              </p>
              <div className="flex md:flex-col gap-1.5 overflow-x-auto no-scrollbar">
                {fruitFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFruit(f)}
                    className={`shrink-0 text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      fruit === f
                        ? "bg-forest text-white"
                        : "text-forest-deep/60 hover:bg-forest/6"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* product grid */}
            <div className="relative p-3 sm:p-5 min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${tab}-${fruit}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                  className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                >
                  {visible.map((product, i) => {
                    const discount = calculateDiscount(
                      product.price,
                      product.originalPrice
                    );
                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={`/shop/${product.slug}`}
                          className="group block rounded-2xl bg-cream/60 border border-forest/5 overflow-hidden hover:shadow-lift hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 45vw, 220px"
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {discount > 0 && (
                              <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                                -{discount}%
                              </span>
                            )}
                          </div>
                          <div className="p-3">
                            <p className="text-xs sm:text-sm font-semibold text-forest-deep truncate group-hover:text-forest">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-1 mt-0.5 mb-2">
                              <Star size={10} className="fill-sunny text-sunny-dark" />
                              <span className="text-[11px] text-forest-deep/50">
                                {product.rating.toFixed(1)} &middot; {product.weight}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-sm font-bold text-forest">
                                {formatPrice(product.price)}
                              </span>
                              <button
                                onClick={(e) => handleAdd(e, product)}
                                disabled={!product.inStock}
                                aria-label={`Add ${product.name} to cart`}
                                className="w-7 h-7 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest-light active:scale-90 transition disabled:opacity-40"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Invisible clones keep the grid at a constant number of
                      rows, so the window doesn't resize between tabs. */}
                  {Array.from({ length: GRID_SLOTS - visible.length }).map((_, i) => (
                    <div
                      key={`slot-${i}`}
                      aria-hidden
                      className="invisible rounded-2xl border border-transparent overflow-hidden"
                    >
                      <div className="aspect-[4/3]" />
                      <div className="p-3">
                        <p className="text-xs sm:text-sm font-semibold truncate">
                          &nbsp;
                        </p>
                        <div className="flex items-center gap-1 mt-0.5 mb-2">
                          <Star size={10} />
                          <span className="text-[11px]">&nbsp;</span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-sm font-bold">&nbsp;</span>
                          <span className="block w-7 h-7 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {visible.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <p className="text-center text-sm text-forest-deep/45">
                    Nothing in this combination — try another fruit.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* status bar */}
          <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 border-t border-forest/8 bg-cream/50 text-[11px] sm:text-xs text-forest-deep/55">
            <span>
              {products.length} products &middot; Free delivery over{" "}
              {formatPrice(FREE_SHIPPING_THRESHOLD)}
            </span>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 font-semibold text-forest hover:gap-2 transition-all"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
