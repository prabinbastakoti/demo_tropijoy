import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  CreditCard,
  Facebook,
  Instagram,
  Music2,
  Smartphone,
  Wallet,
} from "lucide-react";
import HeritageBand from "@/components/brand/HeritageBand";

const quickLinks = [
  { label: "Shop Slices", href: "/shop" },
  { label: "Shop Powders", href: "/shop?category=Fruit+Powder" },
  { label: "Bundles", href: "/bundles" },
  { label: "Quality Process", href: "/our-process" },
  { label: "Recipes", href: "/recipes" },
];

const supportLegalLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Returns & Refunds", href: "/returns-policy" },
  { label: "Storage Guide", href: "/storage-guide" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const paymentMethods = [
  { label: "eSewa", icon: Wallet },
  { label: "Khalti", icon: Wallet },
  { label: "Fonepay", icon: Smartphone },
  { label: "Visa", icon: CreditCard },
  { label: "Mastercard", icon: CreditCard },
  { label: "Cash on Delivery", icon: Banknote },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "TikTok", href: "#", icon: Music2 },
  { label: "Facebook", href: "#", icon: Facebook },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-forest-deep text-cream mt-24 overflow-hidden">
      <HeritageBand tone="dark" className="opacity-60" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Image
              src="/brand/logo-white.png"
              alt="Tropijoy"
              width={221}
              height={100}
              className="h-11 w-auto object-contain mb-4"
            />
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              100% natural, machine-sliced, low-temperature dried fruits in
              Nepal.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sunny mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-sunny transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sunny mb-4">Support &amp; Legal</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              {supportLegalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-sunny transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sunny mb-4">We Accept</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {paymentMethods.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-cream/80"
                >
                  <Icon size={13} />
                  {label}
                </span>
              ))}
            </div>
            <p className="text-sm text-cream/60">
              Delivering natural goodness across Nepal.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/50">
          <p>
            &copy; {new Date().getFullYear()} TropiJoy NP. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5">
            <Link href="/shipping-policy" className="hover:text-cream transition-colors">
              Shipping
            </Link>
            <Link href="/returns-policy" className="hover:text-cream transition-colors">
              Returns
            </Link>
            <Link href="/cookies" className="hover:text-cream transition-colors">
              Cookies
            </Link>
            <Link href="/accessibility" className="hover:text-cream transition-colors">
              Accessibility
            </Link>
            <Link href="/sitemap" className="hover:text-cream transition-colors">
              Sitemap
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-sunny hover:text-forest-deep transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
