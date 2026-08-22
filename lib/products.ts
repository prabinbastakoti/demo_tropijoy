import productsData from "@/data/products.json";
import type { FruitType, Product, ProductCategory, SortOption } from "./types";

export const products = productsData as Product[];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBestSellers(limit?: number): Product[] {
  const list = products
    .filter((p) => p.tags.includes("Best Seller"))
    .sort((a, b) => b.rating - a.rating);
  return limit ? list.slice(0, limit) : list;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameFruit = products.filter(
    (p) => p.id !== product.id && p.fruitType === product.fruitType
  );
  const sameCategory = products.filter(
    (p) =>
      p.id !== product.id &&
      p.category === product.category &&
      p.fruitType !== product.fruitType
  );
  return [...sameFruit, ...sameCategory].slice(0, limit);
}

export const FRUIT_TYPES: FruitType[] = [
  "Mango",
  "Pineapple",
  "Dragonfruit",
  "Banana",
  "Berry",
  "Citrus",
];

export const CATEGORIES: ProductCategory[] = [
  "Dehydrated Fruit",
  "Fruit Powder",
];

export interface ProductFilters {
  keyword: string;
  category: ProductCategory | "All";
  fruitTypes: FruitType[];
  minPrice: number;
  maxPrice: number;
  sort: SortOption;
}

export function filterAndSortProducts(
  source: Product[],
  filters: ProductFilters
): Product[] {
  const keyword = filters.keyword.trim().toLowerCase();

  const result = source.filter((p) => {
    const matchesKeyword =
      !keyword ||
      p.name.toLowerCase().includes(keyword) ||
      p.fruitType.toLowerCase().includes(keyword) ||
      p.category.toLowerCase().includes(keyword) ||
      p.tags.some((t) => t.toLowerCase().includes(keyword));
    const matchesCategory =
      filters.category === "All" || p.category === filters.category;
    const matchesFruit =
      filters.fruitTypes.length === 0 || filters.fruitTypes.includes(p.fruitType);
    const matchesPrice =
      p.price >= filters.minPrice && p.price <= filters.maxPrice;
    return matchesKeyword && matchesCategory && matchesFruit && matchesPrice;
  });

  switch (filters.sort) {
    case "price-asc":
      return [...result].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...result].sort((a, b) => b.price - a.price);
    case "rating-desc":
      return [...result].sort((a, b) => b.rating - a.rating);
    default:
      return [...result].sort(
        (a, b) =>
          Number(b.tags.includes("Best Seller")) -
          Number(a.tags.includes("Best Seller"))
      );
  }
}
