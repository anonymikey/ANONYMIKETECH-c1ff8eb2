import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      rafRef.current = 0;
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

      setVisible(scrollY > 400);
      setScrollProgress(progress);
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // SVG circle geometry
  const size = 48;
  const stroke = 2;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - scrollProgress * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0b]/80 backdrop-blur-xl shadow-lg shadow-black/30 transition-all duration-[500ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:border-accent/40 hover:bg-[#0c0c0e]/90 hover:shadow-accent/10 sm:bottom-8 sm:right-8 ${
        visible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-6 opacity-0 scale-90 pointer-events-none"
      }`}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(212,162,47)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>

      {/* Arrow icon */}
      <ArrowUp
        size={18}
        weight="bold"
        className="relative z-10 text-zinc-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-accent"
      />
    </button>
  );
}
