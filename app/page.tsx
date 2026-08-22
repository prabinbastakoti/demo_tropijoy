import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroWindow from "@/components/home/HeroWindow";
import TrustBar from "@/components/home/TrustBar";
import CategoryBento from "@/components/home/CategoryBento";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import Testimonials from "@/components/home/Testimonials";
import BlogTeaser from "@/components/home/BlogTeaser";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { getBestSellers } from "@/lib/products";

export default function Home() {
  const bestSellers = getBestSellers(4);

  return (
    <>
      <HeroWindow />
      <TrustBar />
      <CategoryBento />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <SectionHeading
            align="left"
            eyebrow="Customer favourites"
            title="Best Sellers"
            className="mb-0"
          />
          <Link
            href="/best-sellers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:gap-3 transition-all"
          >
            See all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <ProcessTimeline />
      <Testimonials />
      <BlogTeaser />

      {/* closing CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest via-forest-light to-forest-deep px-6 py-14 sm:px-14 sm:py-20 text-center noise">
          <div className="absolute inset-0 dotted-grid opacity-[0.12]" />
          <div className="relative">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white text-balance">
              Taste the difference{" "}
              <span className="text-gradient-brand">real fruit</span> makes
            </h2>
            <p className="mt-4 text-white/70 max-w-lg mx-auto text-balance">
              Free delivery on orders over Rs. 3,000, anywhere in Nepal. Nine
              month shelf life, no preservatives.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/shop" size="lg">
                Shop All Products <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink
                href="/about"
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white hover:text-forest-deep"
              >
                Our Story
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
