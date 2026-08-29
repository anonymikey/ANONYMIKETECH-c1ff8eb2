import { useEffect, useRef, useState } from "react";
import { useLoader } from "@/components/loaders/LoaderProvider";
import { CursorProvider } from "./CursorContext";
import {
  clearCardStyles,
  closestElement,
  cursorModeForTarget,
  MAGNETIC_SELECTOR,
  updateCardStyles,
} from "./CursorMagnet";
import { CursorCore } from "./CursorCore";
import { CursorParticles } from "./CursorParticles";
import { CursorRing } from "./CursorRing";
import { useCursor } from "./useCursor";
import "./cursor.css";

type Particle = {
  x: number;
  y: number;
  life: number;
  driftX: number;
  driftY: number;
  scale: number;
};

function PremiumCursorLayer() {
  const { isAppReady } = useLoader();
  const {
    mode,
    isVisible,
    isPointerDown,
    isScrolling,
    setMode,
    setPointerDown,
    setScrolling,
    setVisible,
  } = useCursor();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activeCardRef = useRef<HTMLElement | null>(null);
  const activeMagnetRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const clickTimerRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>(
    Array.from({ length: 20 }, () => ({
      x: 0,
      y: 0,
      life: 0,
      driftX: 0,
      driftY: 0,
      scale: 1,
    })),
  );
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnabled = () => {
      setEnabled(
        finePointer.matches &&
          !reducedMotion.matches &&
          !("ontouchstart" in window) &&
          navigator.maxTouchPoints === 0,
      );
    };

    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);
    return () => {
      finePointer.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !isAppReady) {
      document.body.classList.remove("premium-cursor-enabled");
      setVisible(false);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    document.body.classList.add("premium-cursor-enabled");
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    const state = { lastX: target.x, lastY: target.y, lastSpawn: 0, rotation: 0 };
    let particleIndex = 0;

    const spawnParticle = (time: number) => {
      if (time - state.lastSpawn < 34) return;
      const particle = particlesRef.current[particleIndex];
      particleIndex = (particleIndex + 1) % particlesRef.current.length;
      particle.x = current.x;
      particle.y = current.y;
      particle.life = 1;
      particle.driftX = (Math.random() - 0.5) * 0.35;
      particle.driftY = (Math.random() - 0.5) * 0.35;
      particle.scale = 0.55 + Math.random() * 0.65;
      state.lastSpawn = time;
    };

    const animate = (time: number) => {
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      state.rotation += 0.7;

      root.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      root.style.setProperty("--cursor-rotation", `${state.rotation}deg`);

      const distance = Math.hypot(
        current.x - state.lastX,
        current.y - state.lastY,
      );
      if (distance > 1.2) spawnParticle(time);
      state.lastX = current.x;
      state.lastY = current.y;

      particlesRef.current.forEach((particle, index) => {
        if (particle.life <= 0) return;
        particle.life -= 0.022;
        particle.x += particle.driftX;
        particle.y += particle.driftY;
        const node = particleRefs.current[index];
        if (!node) return;
        node.style.opacity = `${Math.max(0, particle.life * 0.65)}`;
        node.style.transform = `translate3d(${particle.x - current.x}px, ${
          particle.y - current.y
        }px, 0) scale(${particle.scale * particle.life})`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const targetInfo = cursorModeForTarget(event.target);
      const magnet = closestElement(event.target, MAGNETIC_SELECTOR);
      const card = targetInfo.mode === "card" || targetInfo.mode === "synth"
        ? targetInfo.element
        : null;

      if (activeCardRef.current !== card) {
        clearCardStyles(activeCardRef.current);
        activeCardRef.current = card;
      }
      if (card) updateCardStyles(card, event.clientX, event.clientY);

      if (activeMagnetRef.current !== magnet) {
        activeMagnetRef.current?.classList.remove("cursor-magnetic-active");
        magnet?.classList.add("cursor-magnetic-active");
        activeMagnetRef.current = magnet;
      }

      setMode(targetInfo.mode);
      target.x = event.clientX;
      target.y = event.clientY;

      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        target.x += (rect.left + rect.width / 2 - target.x) * 0.16;
        target.y += (rect.top + rect.height / 2 - target.y) * 0.16;
      }
      setVisible(true);
    };

    const onPointerLeave = () => {
      setVisible(false);
      clearCardStyles(activeCardRef.current);
      activeCardRef.current = null;
      activeMagnetRef.current?.classList.remove("cursor-magnetic-active");
      activeMagnetRef.current = null;
    };

    const onPointerDown = () => {
      setPointerDown(true);
      if (clickTimerRef.current !== null) window.clearTimeout(clickTimerRef.current);
      clickTimerRef.current = window.setTimeout(() => setPointerDown(false), 300);
    };

    const onScroll = () => {
      setScrolling(true);
      if (scrollTimerRef.current !== null) window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = window.setTimeout(() => setScrolling(false), 140);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("premium-cursor-enabled");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (scrollTimerRef.current !== null) window.clearTimeout(scrollTimerRef.current);
      if (clickTimerRef.current !== null) window.clearTimeout(clickTimerRef.current);
      clearCardStyles(activeCardRef.current);
      activeMagnetRef.current?.classList.remove("cursor-magnetic-active");
    };
  }, [
    enabled,
    isAppReady,
    setMode,
    setPointerDown,
    setScrolling,
    setVisible,
  ]);

  if (!enabled || !isAppReady) return null;

  return (
    <div
      ref={rootRef}
      className={`premium-cursor premium-cursor--${mode} ${
        isVisible ? "" : "premium-cursor--hidden"
      } ${
        isPointerDown ? "premium-cursor--clicking" : ""
      } ${isScrolling ? "premium-cursor--scrolling" : ""}`}
      aria-hidden="true"
    >
      <CursorParticles particleRefs={particleRefs} />
      <CursorRing />
      <CursorCore />
      <span className="premium-cursor__click-wave" />
      <span className="premium-cursor__scan-beam" />
    </div>
  );
}

export function PremiumCursor() {
  return (
    <CursorProvider>
      <PremiumCursorLayer />
    </CursorProvider>
  );
}