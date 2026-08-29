import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  frameSet: "hero" | "cinematic";
  frameCount?: number;
  className?: string;
};

function framePath(frameSet: "hero" | "cinematic", n: number): string {
  const dir = frameSet === "hero" ? "frames" : "frames2";
  return `/${dir}/frame_${String(n).padStart(4, "0")}.jpg`;
}

export function ServiceFrameSequence({
  frameSet,
  frameCount = 169,
  className = "",
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const loadedRef = useRef(false);
  const lastFrameRef = useRef(-1);
  const [loaded, setLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Preload frames
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = framePath(frameSet, i);
      img.onload = () => {
        if (cancelled) return;
        if (i === 1) setLoaded(true);
        if (imgs.every((im) => im.complete)) {
          loadedRef.current = true;
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        if (i === 1) setLoaded(true);
      };
      imgs.push(img);
    }
    framesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, [frameSet, frameCount]);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const img = framesRef.current[index];
      if (!canvas || !img || !img.complete || !img.naturalWidth) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let drawW: number;
      let drawH: number;
      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
      }

      if (window.innerWidth <= 768) {
        drawW *= 1.3;
        drawH *= 1.3;
      }

      const drawX = (cw - drawW) / 2;
      const drawY = (ch - drawH) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Draw first frame once loaded
  useEffect(() => {
    if (!loaded) return;
    drawFrame(0);
    lastFrameRef.current = 0;
  }, [loaded, drawFrame]);

  // Scroll-driven frame playback
  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        if (!section || !loadedRef.current) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress =
          scrollable <= 0
            ? 0
            : Math.min(1, Math.max(0, -rect.top / scrollable));

        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(progress * frameCount),
        );
        if (frameIndex !== lastFrameRef.current) {
          lastFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame, frameCount, reducedMotion]);

  // Reduced motion: show first frame statically
  useEffect(() => {
    if (!reducedMotion || !loaded) return;
    drawFrame(0);
    lastFrameRef.current = 0;
  }, [reducedMotion, loaded, drawFrame]);

  return (
    <section
      ref={sectionRef}
      className={`service-frame-sequence relative ${className}`}
      style={{
        height: reducedMotion ? "100dvh" : undefined,
      }}
    >
      <div
        className="sticky top-0 min-h-[100dvh] w-full overflow-hidden bg-background"
        style={{ height: "100dvh", willChange: "transform", transform: "translateZ(0)" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />
        {/* Cinematic vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 10%, transparent 30%, rgba(10,10,11,0.45) 70%, rgba(10,10,11,0.85) 100%)",
          }}
        />
      </div>
    </section>
  );
}
