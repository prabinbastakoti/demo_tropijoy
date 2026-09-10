"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Send } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/app/actions/checkout";
import HeritageBand from "@/components/brand/HeritageBand";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const result = await submitLead({ email, source: "footer-newsletter" });
      if (result.success) {
        toast.success(result.message);
        setEmail("");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer id='contact' className='relative bg-forest-deep text-cream mt-24 overflow-hidden'>
      <HeritageBand tone='dark' className='opacity-60' />
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10'>
          <div className='md:col-span-1'>
            <Image
              src='/brand/logo-white.png'
              alt='Tropijoy'
              width={221}
              height={100}
              className='h-11 w-auto object-contain mb-4'
            />
            <p className='text-cream/60 text-sm leading-relaxed max-w-xs'>
              Premium dehydrated fruits &amp; banana powder. Pure joy in every
              bite.
            </p>
            <div className='flex gap-3 mt-5'>
              {[Instagram, Facebook, Send].map((Icon, i) => (
                <a
                  key={i}
                  href='#'
                  className='w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-sunny hover:text-forest-deep transition-colors'
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className='font-display font-semibold text-sunny mb-4'>Shop</h4>
            <ul className='space-y-2 text-sm text-cream/70'>
              <li>
                <Link href='/shop' className='hover:text-sunny transition-colors'>
                  All Products
                </Link>
              </li>
              <li>
                <Link href='/best-sellers' className='hover:text-sunny transition-colors'>
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href='/gift-cards' className='hover:text-sunny transition-colors'>
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href='/gifting' className='hover:text-sunny transition-colors'>
                  Gifting &amp; Bulk Orders
                </Link>
              </li>
              <li>
                <Link href='/wholesale' className='hover:text-sunny transition-colors'>
                  Wholesale &amp; Stockists
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-display font-semibold text-sunny mb-4'>Company</h4>
            <ul className='space-y-2 text-sm text-cream/70'>
              <li>
                <Link href='/our-farms' className='hover:text-sunny transition-colors'>
                  Our Farms &amp; Process
                </Link>
              </li>
              <li>
                <Link href='/about' className='hover:text-sunny transition-colors'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/sustainability' className='hover:text-sunny transition-colors'>
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href='/careers' className='hover:text-sunny transition-colors'>
                  Careers
                </Link>
              </li>
              <li>
                <Link href='/press' className='hover:text-sunny transition-colors'>
                  Press &amp; Media
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-display font-semibold text-sunny mb-4'>Support</h4>
            <ul className='space-y-2 text-sm text-cream/70'>
              <li>
                <Link href='/faq' className='hover:text-sunny transition-colors'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href='/shipping-returns' className='hover:text-sunny transition-colors'>
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link href='/track-order' className='hover:text-sunny transition-colors'>
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href='/contact' className='hover:text-sunny transition-colors'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href='/refer' className='hover:text-sunny transition-colors'>
                  Refer a Friend
                </Link>
              </li>
              <li>
                <Link href='/wishlist' className='hover:text-sunny transition-colors'>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href='/orders' className='hover:text-sunny transition-colors'>
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-display font-semibold text-sunny mb-4'>
              Stay Fresh
            </h4>
            <p className='text-sm text-cream/60 mb-3'>
              Get 10% off your first order + tropical recipe drops.
            </p>
            <form onSubmit={handleSubscribe} className='flex gap-2'>
              <input
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='you@email.com'
                className='flex-1 min-w-0 rounded-full px-4 py-2.5 text-sm bg-white/10 text-cream placeholder:text-cream/40 outline-none focus:ring-2 focus:ring-sunny'
              />
              <button
                type='submit'
                disabled={loading}
                className='shrink-0 rounded-full px-5 py-2.5 bg-sunny text-forest-deep text-sm font-semibold hover:bg-sunny-bright transition-colors disabled:opacity-50'
              >
                {loading ? "..." : "Join"}
              </button>
            </form>
          </div>
        </div>

        <div className='border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/50'>
          <p>
            &copy; {new Date().getFullYear()} Tropijoy. All rights reserved.
          </p>
          <nav className='flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5'>
            <Link href='/privacy' className='hover:text-cream transition-colors'>
              Privacy
            </Link>
            <Link href='/terms' className='hover:text-cream transition-colors'>
              Terms
            </Link>
            <Link href='/cookies' className='hover:text-cream transition-colors'>
              Cookies
            </Link>
            <Link href='/accessibility' className='hover:text-cream transition-colors'>
              Accessibility
            </Link>
            <Link href='/sitemap' className='hover:text-cream transition-colors'>
              Sitemap
            </Link>
          </nav>
          <p>Pure joy in every bite 🌿</p>
        </div>
      </div>
    </footer>
  );
}
