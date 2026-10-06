"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

type Props = { children: React.ReactNode };
type ScrollToDetail = { top: number; immediate?: boolean };

export function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({
      lerp: isTouchDevice ? 0.16 : 0.1,
      duration: isTouchDevice ? 0.8 : 1.2,
      smoothWheel: !isTouchDevice,
      syncTouch: false,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;

    const onScrollTo = (event: Event) => {
      const detail = (event as CustomEvent<ScrollToDetail>).detail;
      lenis.scrollTo(detail.top, {
        immediate: detail.immediate ?? true,
      });
    };
    window.addEventListener("anonymiketech:scroll-to", onScrollTo);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("anonymiketech:scroll-to", onScrollTo);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
