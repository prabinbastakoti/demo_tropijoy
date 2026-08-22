import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { shippingDocument } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Where Tropijoy delivers across Nepal, how long it takes, what it costs, and how returns work.",
};

export default function ShippingReturnsPage() {
  return <LegalLayout doc={shippingDocument} currentHref="/shipping-returns" />;
}
