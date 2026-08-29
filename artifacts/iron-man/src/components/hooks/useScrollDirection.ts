import { useCallback, useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

/**
 * Returns the current scroll direction and whether the user is at the very top.
 * Hides when scrolling down, shows when scrolling up.
 * Always visible at the top of the page.
 */
export function useScrollDirection({ threshold = 8 }: { threshold?: number } = {}) {
  const [direction, setDirection] = useState<ScrollDirection>("up");
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      tickingRef.current = false;
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollYRef.current;

      if (scrollY < 10) {
        setIsAtTop(true);
        setDirection("up");
      } else {
        setIsAtTop(false);
        if (delta > threshold) {
          setDirection("down");
        } else if (delta < -threshold) {
          setDirection("up");
        }
      }

      lastScrollYRef.current = scrollY;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const isVisible = direction === "up" || isAtTop;

  return { direction, isVisible, isAtTop };
}
