"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Send, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/app/actions/checkout";

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
    <footer id='contact' className='bg-forest-deep text-cream mt-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
          <div className='md:col-span-1'>
            <Image
              src='/logo.png'
              alt='Tropijoy'
              width={221}
              height={100}
              className='h-11 w-auto object-contain mb-4'
            />
            <p className='text-cream/60 text-sm leading-relaxed max-w-xs'>
              Premium dehydrated fruits &amp; fruit powders. Pure joy in every
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
                  Dehydrated Fruits
                </Link>
              </li>
              <li>
                <Link href='/shop' className='hover:text-sunny transition-colors'>
                  Fruit Powders
                </Link>
              </li>
              <li>
                <Link
                  href='/best-sellers'
                  className='hover:text-sunny transition-colors'
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href='/about' className='hover:text-sunny transition-colors'>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-display font-semibold text-sunny mb-4'>
              Contact
            </h4>
            <ul className='space-y-3 text-sm text-cream/70'>
              <li className='flex items-center gap-2'>
                <Mail size={16} className='text-sunny shrink-0' />{" "}
                contact@tropijoynp.com
              </li>
              <li className='flex items-center gap-2'>
                <Phone size={16} className='text-sunny shrink-0' /> +977
                9768530718
              </li>
              <li className='flex items-center gap-2'>
                <MapPin size={16} className='text-sunny shrink-0' /> Kathmandu,
                Nepal
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

        <div className='border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-cream/50'>
          <p>
            &copy; {new Date().getFullYear()} Tropijoy. All rights reserved.
          </p>
          <p>Pure joy in every bite 🌿</p>
        </div>
      </div>
    </footer>
  );
}
