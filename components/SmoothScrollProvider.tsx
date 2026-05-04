"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap-client";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

/** Desktop/Tablet: Lenis + ScrollTrigger.update. Mobil (≤767px): natives Scrollen — weniger JS, bessere Scroll-Performance. */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const mobile = window.matchMedia("(max-width: 767px)");

    let lenis: Lenis | null = null;
    let rafId = 0;

    const loop = (time: number) => {
      lenis?.raf(time);
      rafId = window.requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const destroyLenis = () => {
      stopLoop();
      lenis?.destroy();
      lenis = null;
    };

    const createLenis = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
        syncTouch: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      rafId = window.requestAnimationFrame(loop);
    };

    const sync = () => {
      if (mobile.matches) {
        destroyLenis();
      } else {
        createLenis();
      }
      ScrollTrigger.refresh();
    };

    sync();
    mobile.addEventListener("change", sync);
    return () => {
      mobile.removeEventListener("change", sync);
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}
