import { Leaf, Truck } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[var(--announce-h)] bg-forest-deep text-cream">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-medium tracking-wide">
        <span className="flex items-center gap-1.5">
          <Truck size={13} className="text-sunny shrink-0" />
          <span className="truncate">Free delivery across Nepal on orders over Rs. 3,000</span>
        </span>
        <span className="hidden sm:inline text-cream/30">|</span>
        <span className="hidden sm:flex items-center gap-1.5">
          <Leaf size={13} className="text-sunny shrink-0" />
          100% Natural &amp; Preservative-Free
        </span>
      </div>
    </div>
  );
}
