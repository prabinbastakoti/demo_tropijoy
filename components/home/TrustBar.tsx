"use client";

import { Leaf, PackageCheck, Sprout, Sun, Truck, XCircle } from "lucide-react";
import Marquee from "@/components/motion/Marquee";

const claims = [
  { icon: XCircle, label: "No Added Sugar" },
  { icon: Leaf, label: "100% Organic" },
  { icon: Sprout, label: "Vegan & Gluten-Free" },
  { icon: XCircle, label: "No Sulphites" },
  { icon: Sun, label: "Small-Batch Dried" },
  { icon: Truck, label: "Free Delivery Over Rs. 3,000" },
  { icon: PackageCheck, label: "Resealable Pouches" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-forest/10 bg-forest-deep py-4">
      <Marquee>
        {claims.map((claim, i) => (
          <span
            key={`${claim.label}-${i}`}
            className="inline-flex items-center gap-2.5 px-7 text-sm font-semibold text-cream/80 whitespace-nowrap"
          >
            <claim.icon size={15} className="text-sunny shrink-0" />
            {claim.label}
            <span className="ml-7 text-sunny/40">◆</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
