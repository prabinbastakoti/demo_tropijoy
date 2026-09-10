import { ArrowRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import Testimonials from "@/components/home/Testimonials";
import BlogTeaser from "@/components/home/BlogTeaser";
import { ButtonLink } from "@/components/ui/Button";
import HeritageBand from "@/components/brand/HeritageBand";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryGrid />
      <ProcessTimeline />
      <Testimonials />
      <BlogTeaser />

      {/* closing CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest via-forest-light to-forest-deep px-6 py-14 sm:px-14 sm:py-20 text-center noise">
          <HeritageBand tone="dark" />
          <div className="relative">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white text-balance">
              Taste the difference <span className="text-sunny">real fruit</span> makes
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
