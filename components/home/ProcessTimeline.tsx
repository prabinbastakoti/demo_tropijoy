"use client";

import { motion } from "framer-motion";
import { Package, Snowflake, Sun, Truck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    icon: Sun,
    title: "Picked ripe",
    detail:
      "We buy direct from eleven farms and pay above market rate so fruit can be picked at full ripeness, not transport-hard.",
    meta: "Day 0",
  },
  {
    icon: Snowflake,
    title: "Dried gently",
    detail:
      "Slices go into low-temperature dehydrators at 45–55°C. Powders are freeze-dried under vacuum so nothing ever cooks.",
    meta: "8–36 hrs",
  },
  {
    icon: Package,
    title: "Packed small-batch",
    detail:
      "Sealed within 48 hours into nitrogen-flushed, resealable pouches with a silica sachet. No sulphites, no colourings.",
    meta: "Day 2",
  },
  {
    icon: Truck,
    title: "Sent to you",
    detail:
      "Dispatched from Kathmandu in waterproof packaging built for monsoon delivery, anywhere in Nepal.",
    meta: "Day 3",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Behind the Bite"
        title="From orchard to pouch in four steps"
        description="No warehouse middlemen, no year-old stock. Here's exactly what happens to your fruit."
        className="mb-14"
      />

      <div className="relative">
        {/* connecting line */}
        <div className="hidden lg:block absolute top-[38px] left-[12%] right-[12%] h-0.5 bg-forest/10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ originX: 0 }}
            className="h-full bg-gradient-to-r from-forest via-sunny to-forest"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12} className="relative">
              <div className="flex lg:flex-col items-start lg:items-center gap-4 lg:text-center">
                <div className="relative shrink-0">
                  <div className="w-[76px] h-[76px] rounded-2xl bg-white border border-forest/10 shadow-lift flex items-center justify-center">
                    <step.icon size={26} className="text-forest" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-sunny text-forest-deep text-xs font-bold flex items-center justify-center border-2 border-cream">
                    {i + 1}
                  </span>
                </div>
                <div className="lg:mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-forest/45 mb-1">
                    {step.meta}
                  </p>
                  <h3 className="font-display font-bold text-lg text-forest-deep mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-forest-deep/60 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
