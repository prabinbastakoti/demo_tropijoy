"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Package, Search, ShoppingBag, X } from "lucide-react";
import { useCartStore, useCartTotals } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";
import SearchModal from "./SearchModal";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const toggleCart = useCartStore((s) => s.toggleCart);
  const { itemCount } = useCartTotals();
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const hydrated = useHydrated();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-white/75 shadow-sm border-b border-forest/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="Tropijoy"
                width={221}
                height={100}
                className="h-12 sm:h-14 w-auto object-contain"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-semibold transition-colors relative group",
                      active
                        ? "text-forest"
                        : "text-forest-deep/75 hover:text-forest"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-sunny transition-all duration-300",
                        active ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest/10 text-forest transition-colors"
              >
                <Search size={19} />
              </button>

              <Link
                href="/orders"
                aria-label="Order history"
                className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center hover:bg-forest/10 text-forest transition-colors"
              >
                <Package size={19} />
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest/10 text-forest transition-colors"
              >
                <Heart size={19} />
                {hydrated && wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-forest text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 min-w-[18px] h-[18px] flex items-center justify-center border-2 border-cream">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleCart}
                aria-label="Open cart"
                className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest/10 text-forest transition-colors"
              >
                <ShoppingBag size={19} />
                <AnimatePresence>
                  {hydrated && itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 bg-sunny text-forest-deep text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center border-2 border-cream px-1"
                    >
                      {itemCount > 9 ? "9+" : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest/10 text-forest transition-colors"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest-deep/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 h-full w-72 bg-cream p-6 flex flex-col gap-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <Image
                  src="/logo.png"
                  alt="Tropijoy"
                  width={177}
                  height={80}
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="text-forest"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-semibold text-forest-deep py-2 hover:text-forest transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-forest/10 pt-4 flex flex-col gap-1">
                <Link
                  href="/orders"
                  className="text-sm font-medium text-forest-deep/70 py-2 flex items-center gap-2"
                >
                  <Package size={16} /> Order History
                </Link>
                <Link
                  href="/wishlist"
                  className="text-sm font-medium text-forest-deep/70 py-2 flex items-center gap-2"
                >
                  <Heart size={16} /> Wishlist
                </Link>
                <Link
                  href="/faq"
                  className="text-sm font-medium text-forest-deep/70 py-2"
                >
                  FAQ
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
