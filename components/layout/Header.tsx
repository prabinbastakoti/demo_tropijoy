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

const secondaryLinks = [
  { label: "Order History", href: "/orders", icon: Package },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleCart = useCartStore((s) => s.toggleCart);
  const { itemCount } = useCartTotals();
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const hydrated = useHydrated();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
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

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  /** The link the moving indicator should sit under. */
  const indicatorFor = hovered ?? navLinks.find((l) => isActive(l.href))?.href;

  return (
    <>
      {/* fixed so the hero's gradient runs underneath it */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-forest/8"
            : "bg-transparent border-b border-transparent"
        )}
      >
        {/* same container as the hero so the two align exactly */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] sm:h-[84px]">
            <Link href="/" className="flex items-center shrink-0" aria-label="Tropijoy home">
              <Image
                src="/logo.png"
                alt="Tropijoy"
                width={221}
                height={100}
                priority
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </Link>

            {/* desktop nav with a single indicator that follows hover, resting on the active route */}
            <nav
              className="hidden md:flex items-center gap-0.5"
              onMouseLeave={() => setHovered(null)}
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200",
                      active || hovered === link.href
                        ? "text-forest-deep"
                        : "text-forest-deep/60"
                    )}
                  >
                    {indicatorFor === link.href && (
                      <motion.span
                        layoutId="nav-indicator"
                        className={cn(
                          "absolute inset-0 -z-10 rounded-full",
                          active
                            ? "bg-sunny shadow-[0_2px_10px_-2px_rgba(252,209,22,0.7)]"
                            : "bg-white/70 shadow-[0_2px_10px_-4px_rgba(8,48,26,0.25)]"
                        )}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* actions */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="group hidden sm:flex items-center gap-2 rounded-full border border-forest/12 bg-white/60 px-3 py-1.5 text-forest-deep/50 transition-colors hover:border-forest/30 hover:text-forest"
              >
                <Search size={15} />
                <span className="text-xs font-medium">Search</span>
                <kbd className="rounded border border-forest/15 bg-white/70 px-1 text-[10px] font-semibold text-forest-deep/40">
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="sm:hidden w-10 h-10 rounded-full flex items-center justify-center text-forest hover:bg-forest/8 transition-colors"
              >
                <Search size={19} />
              </button>

              <Link
                href="/orders"
                aria-label="Order history"
                className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center text-forest hover:bg-forest/8 transition-colors"
              >
                <Package size={19} />
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-forest hover:bg-forest/8 transition-colors"
              >
                <Heart size={19} />
                {hydrated && wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-forest text-white text-[10px] font-bold rounded-full min-w-[17px] h-[17px] flex items-center justify-center border-2 border-cream px-1">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleCart}
                aria-label="Open cart"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-forest hover:bg-forest/8 transition-colors"
              >
                <ShoppingBag size={19} />
                <AnimatePresence>
                  {hydrated && itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0.5 right-0.5 bg-sunny text-forest-deep text-[10px] font-bold rounded-full min-w-[17px] h-[17px] flex items-center justify-center border-2 border-cream px-1"
                    >
                      {itemCount > 9 ? "9+" : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-forest hover:bg-forest/8 transition-colors"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
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
              className="absolute right-0 top-0 h-full w-[280px] bg-cream p-6 flex flex-col gap-6 overflow-y-auto"
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
                  className="w-9 h-9 rounded-full flex items-center justify-center text-forest hover:bg-forest/8"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                      isActive(link.href)
                        ? "bg-sunny text-forest-deep"
                        : "text-forest-deep/75 hover:bg-forest/6"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-forest/10 pt-4 flex flex-col gap-1">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-forest-deep/65 hover:bg-forest/6 transition-colors"
                  >
                    <link.icon size={16} /> {link.label}
                  </Link>
                ))}
                <Link
                  href="/faq"
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-forest-deep/65 hover:bg-forest/6 transition-colors"
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
