import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Himalayan skyline line-art strip used across every real Tropijoy
 * packaging label. Used as a recurring decorative motif in place of the old
 * `.dotted-grid` texture — replace `<div className="dotted-grid ..." />`
 * usages with this component.
 */
export default function HeritageBand({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-x-0 bottom-0 pointer-events-none", className)}
    >
      <div className="relative w-full h-20 sm:h-28">
        <Image
          src="/brand/mountain.png"
          alt=""
          fill
          className={cn(
            "object-cover object-bottom",
            tone === "dark" ? "opacity-30 invert brightness-[3]" : "opacity-[0.08]"
          )}
        />
      </div>
    </div>
  );
}
