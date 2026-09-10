import Image from "next/image";
import { ArrowRight, Gift } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

const previewImages = [
  "/products/apple.png",
  "/products/orange.png",
  "/products/banana.png",
  "/products/lemon.png",
  "/products/pineapple.png",
  "/products/banana-powder.png",
];

export default function BundleBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-sage px-6 py-12 sm:px-14 sm:py-16 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 mb-5 text-xs font-semibold text-forest-deep">
              <Gift size={14} className="text-forest" />
              Custom Bundles
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-deep text-balance">
              Build Your Custom Snack Bundle
            </h2>
            <p className="mt-3 text-forest-deep/70 max-w-md mx-auto lg:mx-0 text-balance">
              Pick any 3 or 6 dried fruit pouches and save up to 15%. Perfect
              for healthy daily snacking or gifting.
            </p>
            <div className="mt-7 flex justify-center lg:justify-start">
              <ButtonLink href="/bundles" size="lg">
                Build Your Bundle <ArrowRight size={18} />
              </ButtonLink>
            </div>
          </div>

          <div className="flex -space-x-4 justify-center">
            {previewImages.map((src, i) => (
              <div
                key={src}
                style={{ zIndex: previewImages.length - i }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-cream bg-white overflow-hidden shrink-0 shadow-lift"
              >
                <Image src={src} alt="" fill sizes="80px" className="object-contain p-2" />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
