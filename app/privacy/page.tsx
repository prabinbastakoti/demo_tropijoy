import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { privacyDocument } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal information Tropijoy collects, why we collect it, and what we do with it.",
};

export default function PrivacyPage() {
  return <LegalLayout doc={privacyDocument} currentHref="/privacy" />;
}
