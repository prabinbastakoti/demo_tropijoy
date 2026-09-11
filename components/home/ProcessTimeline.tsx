"use client";

import { motion } from "framer-motion";
import { Droplets, Package, ShieldCheck, Snowflake, Zap } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    icon: ShieldCheck,
    title: "Selecting premium fruit",
    detail:
      "We hand-pick premium, ripe fruit from trusted Nepali markets — checked for quality before anything is sliced.",
    meta: "Step 1",
  },
  {
    icon: Droplets,
    title: "Hygienic washing",
    detail:
      "Every batch is washed in a sanitary facility to remove dirt and residue before processing begins.",
    meta: "Step 2",
  },
  {
    icon: Zap,
    title: "Precision machine slicing",
    detail:
      "Uniform, machine-sliced cuts for consistent texture and even drying — no ragged hand-cut pieces.",
    meta: "Step 3",
  },
  {
    icon: Snowflake,
    title: "Low-temperature dehydration",
    detail:
      "Dried slow and low at 45–55°C so flavour, colour and nutrition are protected — nothing ever cooks.",
    meta: "Step 4",
  },
  {
    icon: Package,
    title: "Airtight resealable packaging",
    detail:
      "Sealed into nitrogen-flushed, resealable pouches with a silica sachet. No sulphites, no colourings.",
    meta: "Step 5",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Our Sourcing & Quality Process"
        title="From market fruit to pouch, five careful steps"
        description="No shortcuts, no mystery ingredients. Here's exactly what happens before your pouch is sealed."
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
            className="h-full bg-gradient-to-r from-forest via-forest-light to-forest"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12} className="relative">
              <div className="flex lg:flex-col items-start lg:items-center gap-4 lg:text-center">
                <div className="relative shrink-0">
                  <div className="w-[76px] h-[76px] rounded-2xl bg-white border border-forest/10 shadow-lift flex items-center justify-center">
                    <step.icon size={26} className="text-forest" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-sunny text-white text-xs font-bold flex items-center justify-center border-2 border-cream">
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

      <Reveal delay={0.3}>
        <div className="mt-10 text-center">
          <Link
            href="/our-process"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-light transition-colors"
          >
            See our full quality process <ArrowRight size={15} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
