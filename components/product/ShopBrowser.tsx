"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PackageSearch, SlidersHorizontal, X } from "lucide-react";
import { products, filterAndSortProducts } from "@/lib/products";
import { useFilterStore } from "@/store/filter-store";
import FilterPanel from "./FilterPanel";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

export default function ShopBrowser() {
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { keyword, category, fruitTypes, minPrice, maxPrice, sort, reset } =
    useFilterStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(
    () =>
      filterAndSortProducts(products, {
        keyword,
        category,
        fruitTypes,
        minPrice,
        maxPrice,
        sort,
      }),
    [keyword, category, fruitTypes, minPrice, maxPrice, sort]
  );

  return (
    <>
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-full border border-forest/20 py-3 font-semibold text-forest-deep bg-white"
        >
          <SlidersHorizontal size={16} /> Filters &amp; Sort
        </button>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-28 bg-white/70 rounded-3xl border border-forest/10 p-6">
            <FilterPanel />
          </div>
        </aside>

        <div>
          <p className="text-sm text-forest-deep/50 mb-5">
            {loading
              ? "Loading products…"
              : `Showing ${filtered.length} of ${products.length} products`}
          </p>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="bg-white/60 rounded-3xl border border-forest/10">
              <EmptyState
                icon={PackageSearch}
                title="No products match those filters"
                description="Try widening your price range or clearing a filter or two."
              />
              <div className="pb-10 text-center -mt-4">
                <button
                  onClick={reset}
                  className="text-sm font-semibold text-forest hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest-deep/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-cream p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="text-forest"
                >
                  <X size={22} />
                </button>
              </div>
              <FilterPanel />
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full mt-8 rounded-full bg-forest text-white font-semibold py-3"
              >
                Show {filtered.length} results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
