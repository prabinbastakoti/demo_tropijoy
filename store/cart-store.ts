import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/lib/types";
import { getProductById } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE } from "@/lib/utils";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (productId, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.productId === productId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, { productId, quantity }] });
        }
        set({ isOpen: true });
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      incrementItem: (productId) =>
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),
      decrementItem: (productId) => {
        const items = get().items;
        const target = items.find((i) => i.productId === productId);
        if (target && target.quantity <= 1) {
          set({ items: items.filter((i) => i.productId !== productId) });
        } else {
          set({
            items: items.map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        }
      },
      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: "tropijoy-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export interface DetailedCartLine {
  product: Product;
  quantity: number;
}

export function useCartTotals() {
  const items = useCartStore((s) => s.items);

  const detailed: DetailedCartLine[] = items.flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = detailed.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
  const shippingCost =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
  const total = subtotal + shippingCost;

  return { detailed, itemCount, subtotal, shippingCost, total };
}
