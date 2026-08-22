"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useFilterStore, PRICE_CEILING } from "@/store/filter-store";
import { FRUIT_TYPES, CATEGORIES } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductCategory, SortOption } from "@/lib/types";

const categories: (ProductCategory | "All")[] = ["All", ...CATEGORIES];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
];

export default function FilterPanel({ className }: { className?: string }) {
  const {
    keyword,
    category,
    fruitTypes,
    minPrice,
    maxPrice,
    sort,
    setKeyword,
    setCategory,
    toggleFruitType,
    setPriceRange,
    setSort,
    reset,
  } = useFilterStore();

  const hasActiveFilters =
    keyword !== "" ||
    category !== "All" ||
    fruitTypes.length > 0 ||
    minPrice > 0 ||
    maxPrice < PRICE_CEILING;

  return (
    <div className={cn("space-y-7", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-forest-deep flex items-center gap-2">
          <SlidersHorizontal size={18} /> Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={reset}
            className="text-xs font-semibold text-forest/60 hover:text-forest flex items-center gap-1"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      <div>
        <label
          htmlFor="filter-keyword"
          className="text-sm font-semibold text-forest-deep mb-2 block"
        >
          Search
        </label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-forest/40"
          />
          <input
            id="filter-keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Mango, powder, berry…"
            className="w-full rounded-xl border border-forest/15 pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest/30 bg-white"
          />
        </div>
      </div>

      <div>
        <span className="text-sm font-semibold text-forest-deep mb-2 block">
          Category
        </span>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-colors",
                category === cat
                  ? "bg-forest text-white"
                  : "bg-white text-forest-deep/70 hover:bg-forest/5 border border-forest/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm font-semibold text-forest-deep mb-2 block">
          Fruit Type
        </span>
        <div className="flex flex-col gap-2.5">
          {FRUIT_TYPES.map((fruit) => (
            <label
              key={fruit}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={fruitTypes.includes(fruit)}
                onChange={() => toggleFruitType(fruit)}
                className="w-4 h-4 rounded accent-forest cursor-pointer"
              />
              <span className="text-sm text-forest-deep/80 group-hover:text-forest-deep">
                {fruit}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm font-semibold text-forest-deep mb-2 block">
          Max price: {formatPrice(maxPrice)}
        </span>
        <input
          type="range"
          min={500}
          max={PRICE_CEILING}
          step={50}
          value={maxPrice}
          onChange={(e) => setPriceRange(minPrice, Number(e.target.value))}
          className="w-full accent-forest"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-xs text-forest-deep/40 mt-1">
          <span>Rs. 500</span>
          <span>{formatPrice(PRICE_CEILING)}</span>
        </div>
      </div>

      <div>
        <label
          htmlFor="filter-sort"
          className="text-sm font-semibold text-forest-deep mb-2 block"
        >
          Sort By
        </label>
        <select
          id="filter-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="w-full rounded-xl border border-forest/15 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest/30 bg-white"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
