"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite CSS ticker. Children are rendered twice so the -50% translate in the
 * `marquee` keyframe loops seamlessly.
 */
export default function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
