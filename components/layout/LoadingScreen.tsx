"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoReadyStore } from "@/store/video-ready-store";

/** Minimum time the splash stays up, so it reads as a deliberate loading
 *  moment rather than a flicker on fast connections. */
const MIN_VISIBLE_MS = 500;
/** Upper bound in case a page never signals ready (slow network, blocked
 *  request, etc.) — the splash must not be able to get stuck forever. */
const MAX_WAIT_MS = 3000;

export default function LoadingScreen() {
  const pathname = usePathname();
  const videoReady = useVideoReadyStore((s) => s.ready);
  const resetVideoReady = useVideoReadyStore((s) => s.reset);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [forceReady, setForceReady] = useState(false);

  // Re-arm on every route change — the App Router unmounts the previous
  // page's tree before the next one paints, so each navigation deserves
  // its own "is this page ready" moment, not just the very first load.
  useEffect(() => {
    setMinTimeElapsed(false);
    setForceReady(false);
    if (pathname === "/") resetVideoReady();

    const minTimer = setTimeout(() => setMinTimeElapsed(true), MIN_VISIBLE_MS);
    const maxTimer = setTimeout(() => setForceReady(true), MAX_WAIT_MS);
    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Only the homepage has a video worth waiting on; every other route is
  // ready as soon as the minimum splash time has passed.
  const needsVideo = pathname === "/";
  const ready = minTimeElapsed && (!needsVideo || videoReady || forceReady);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-40 h-16"
          >
            <Image
              src="/brand/logo-green.png"
              alt="Tropijoy"
              fill
              priority
              sizes="160px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
