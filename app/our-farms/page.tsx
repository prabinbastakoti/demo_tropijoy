import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import HeritageBand from "@/components/brand/HeritageBand";
import { ButtonLink } from "@/components/ui/Button";
import { FRUIT_ACCENTS } from "@/lib/products";
import { BUSINESS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Our Farms & Process",
  description:
    "Where Tropijoy fruit comes from, why we pay above market rate, and exactly how it's dried — from eleven Nepali farms to your pouch.",
};

const regions = [
  { fruit: "Apple" as const, place: "High orchards around Mustang & Jumla" },
  { fruit: "Banana" as const, place: "Chitwan, in the warm Terai plains" },
  { fruit: "Orange" as const, place: "Mid-hill groves in Sindhuli & Dhankuta" },
  { fruit: "Lemon" as const, place: "Mid-hill groves in Sindhuli & Dhankuta" },
  { fruit: "Pineapple" as const, place: "Ilam, in Nepal's eastern hills" },
];

const labelSamples = [
  { fruit: "Apple", src: "/labels/200g/apple.png" },
  { fruit: "Orange", src: "/labels/200g/orange.png" },
  { fruit: "Banana", src: "/labels/200g/banana.png" },
  { fruit: "Lemon", src: "/labels/200g/lemon.png" },
  { fruit: "Pineapple", src: "/labels/200g/pineapple.png" },
];

export default function OurFarmsPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Our Farms & Process" }]}
        />

        <div className="mt-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal>
            <span className="inline-block text-xs font-bold tracking-[0.18em] text-forest uppercase mb-4">
              Our farms &amp; process
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-display-md text-forest-deep leading-[1.05] text-balance">
              Eleven farms, one honest process
            </h1>
            <div className="mt-6 space-y-4 text-forest-deep/70 leading-relaxed">
              <p>
                By the time fruit reaches a wholesale market, it has usually been
                picked early — hard enough to survive transport and handling.
                Early-picked fruit never develops full sugar content, and no
                amount of drying can put flavour back in that was never there.
              </p>
              <p>
                So we buy direct from eleven farms across Nepal instead, paying
                15–20% above the prevailing market rate for fruit picked at full
                ripeness and delivered to our facility within 24 hours.
              </p>
              <p>
                Every batch is dried the same honest way: low-temperature
                dehydration for our fruit slices, freeze-drying for our banana
                powder. Nothing sweetened, nothing coloured, nothing rushed.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink href="/shop">
                Shop the harvest <ArrowRight size={18} />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[2rem] bg-white border border-forest/10 p-7 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-wider text-forest/50 mb-5">
                Where each fruit comes from
              </p>
              <ul className="space-y-4">
                {regions.map((r) => (
                  <li key={r.fruit} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: FRUIT_ACCENTS[r.fruit].hex }}
                    />
                    <div>
                      <p className="font-display font-bold text-forest-deep">
                        {r.fruit}
                      </p>
                      <p className="text-sm text-forest-deep/60 flex items-center gap-1.5 mt-0.5">
                        <MapPin size={13} className="shrink-0" /> {r.place}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-6 border-t border-forest/10">
                <p className="text-sm text-forest-deep/70 leading-relaxed">
                  <span className="font-semibold text-forest-deep">
                    Tahera Khatun
                  </span>{" "}
                  founded Tropijoy in {BUSINESS.location} to buy fruit the way
                  farms deserved to be paid — ripe, direct, and at a fair price.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <ProcessTimeline />

      {/* authenticity — real packaging */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeading
          eyebrow="No surprises"
          title="Exactly what arrives at your door"
          description="Every pouch is labelled with the fruit on the front and nothing hidden on the back."
          className="mb-10"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {labelSamples.map((label, i) => (
            <Reveal key={label.fruit} delay={i * 0.06}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-forest/10 bg-white">
                <Image
                  src={label.src}
                  alt={`Tropijoy ${label.fruit} packaging`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* closing CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest via-forest-light to-forest-deep px-6 py-14 sm:px-14 sm:py-20 text-center noise">
          <HeritageBand tone="dark" />
          <div className="relative">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white text-balance">
              Taste where it&apos;s from
            </h2>
            <p className="mt-4 text-white/70 max-w-lg mx-auto text-balance">
              Every pouch traces back to a farm we know by name.
            </p>
            <div className="mt-8">
              <ButtonLink href="/shop" size="lg">
                Shop All Products <ArrowRight size={18} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
