"use client";

import { useVideoReadyStore } from "@/store/video-ready-store";

export default function HeroVisual() {
  const setReady = useVideoReadyStore((s) => s.setReady);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/products/apple.png"
        onLoadedData={setReady}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* flat dim across the whole clip so text stays readable no matter what's playing */}
      <div className="absolute inset-0 bg-forest-deep/35" />
      {/* top scrim keeps the navbar legible over whatever the video is doing */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-forest-deep/75 via-forest-deep/30 to-transparent" />
      {/* bottom scrim keeps the headline/CTAs legible */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-forest-deep/85 via-forest-deep/35 to-transparent" />
    </div>
  );
}
