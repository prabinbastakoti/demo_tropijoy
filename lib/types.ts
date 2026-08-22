export type ProductCategory = "Dehydrated Fruit" | "Fruit Powder";

export type FruitType =
  | "Mango"
  | "Pineapple"
  | "Dragonfruit"
  | "Banana"
  | "Berry"
  | "Citrus";

export type ProductWeight = "100g" | "150g" | "200g" | "250g" | "500g" | "1kg";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  fruitType: FruitType;
  price: number;
  originalPrice: number | null;
  weight: ProductWeight;
  rating: number;
  reviewsCount: number;
  tags: string[];
  description: string;
  nutritionHighlights: string[];
  images: string[];
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating-desc";

export type ContactPlatform =
  | "WhatsApp"
  | "Email"
  | "Instagram"
  | "Telegram"
  | "Phone Call/SMS";

export interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface CheckoutPayload {
  shipping: ShippingDetails;
  contactPlatform: ContactPlatform;
  contactHandle: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    weight: string;
  }[];
  subtotal: number;
  shipping_cost: number;
  total: number;
}

/* ---------------- reviews ---------------- */

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
}

export type ReviewSort = "recent" | "highest" | "lowest" | "helpful";

/* ---------------- blog ---------------- */

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; title: string; text: string };

export type BlogCategory =
  | "Recipes"
  | "Nutrition"
  | "Behind the Scenes"
  | "Guides";

export type AccentColor = "sunny" | "forest" | "berry" | "citrus";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  date: string;
  readTime: number;
  accent: AccentColor;
  blocks: BlogBlock[];
}

/* ---------------- orders ---------------- */

export type OrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered";

export interface OrderItem {
  productId: string;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  placedAt: string;
  items: OrderItem[];
  shipping: ShippingDetails;
  contactPlatform: ContactPlatform;
  contactHandle: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  demoMode: boolean;
}

/* ---------------- faq ---------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}
