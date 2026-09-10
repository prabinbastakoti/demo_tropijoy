import type { Metadata } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import PageTransition from "@/components/motion/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tropijoy.np"),
  title: {
    default: "Tropijoy — Pure Joy In Every Bite",
    template: "%s · Tropijoy",
  },
  description:
    "Premium dehydrated fruits and freeze-dried fruit powders from Nepal. 100% organic, no added sugar, no preservatives.",
  openGraph: {
    title: "Tropijoy — Pure Joy In Every Bite",
    description:
      "Premium dehydrated fruits and freeze-dried fruit powders from Nepal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${baloo.variable}`}>
      <body className="font-sans antialiased bg-cream min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 pt-[calc(var(--announce-h)+var(--header-h))]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1B3B2B",
              color: "#FAF8F5",
              border: "1px solid rgba(232,141,53,0.3)",
            },
          }}
        />
      </body>
    </html>
  );
}
